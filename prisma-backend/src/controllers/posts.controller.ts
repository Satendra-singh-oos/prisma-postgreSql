import { Request, Response } from "express";
import prisma from "../prisma";

async function getAllPost(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllPostWithTitleAndPublished(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: "GIthub",
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: "Twitter",
            },
          },
        ],

        AND: {
          published: true,
        },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPostByUserName(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          isNot: {
            // id: 3,
            name: "Jack",
          },
          is: {
            email: {
              startsWith: "s",
            },
          },
        },
      },

      include: {
        author: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPostByUserNameOnlyTitle(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          isNot: {
            // id: 3,
            name: "Jack",
          },
        },
      },
      select: {
        title: true,
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function aggregationPost(req: Request, res: Response) {
  try {
    const aggregate = await prisma.post.aggregate({
      _sum: {
        likeNum: true,
      },
      _avg: {
        likeNum: true,
      },
      _count: {
        id: true,
      },

      _min: {
        likeNum: true,
      },
      _max: {
        likeNum: true,
      },
    });

    return res.status(200).json(aggregate);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function groupAggregationPost(req: Request, res: Response) {
  try {
    const gropuPost = await prisma.post.groupBy({
      by: ["authorId"],
      _sum: {
        likeNum: true,
      },

      _avg: {
        likeNum: true,
      },
      _count: {
        likeNum: true,
      },
    });

    return res.status(200).json(gropuPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sortTheOutput(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        //likeNum: "asc",
        likeNum: "desc",
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

// size of page 10
// offset pagination
async function paginationOffsetOfPost(req: Request, res: Response) {
  try {
    const { pageNum, pageSize } = req.query;

    const pgNum = +(pageNum ?? 0);
    const pgSize = +(pageSize ?? 10);
    const posts = await prisma.post.findMany({
      skip: pgNum,
      take: pgSize,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

// cursor pagination

async function paginationCursorOfPost(req: Request, res: Response) {
  try {
    const { cursor, pageSize } = req.query;

    const cursorId = cursor ? +cursor : undefined; // Convert cursor to a number if it exists
    const pgSize = pageSize ? +pageSize : 10; // Convert pageSize to a number or default to 10

    const posts = await prisma.post.findMany({
      cursor: {
        id: cursorId,
      },
      take: pgSize,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function transaction(req: Request, res: Response) {
  try {
    const { withdrawId, depositeId } = req.query;

    const userId = Number(withdrawId);

    const withdrawUpdate = prisma.post.update({
      where: {
        id: userId,
      },
      data: {
        likeNum: {
          decrement: 5,
        },
      },
    });

    const user2Id = Number(depositeId);

    const depositUpdate = prisma.post.update({
      where: {
        id: user2Id,
      },
      data: {
        likeNum: {
          increment: 15,
        },
      },
    });

    const result = await prisma.$transaction([withdrawUpdate, depositUpdate]);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getAllPost,
  getAllPostWithTitleAndPublished,
  getPostByUserName,
  getPostByUserNameOnlyTitle,
  aggregationPost,
  groupAggregationPost,
  sortTheOutput,
  paginationOffsetOfPost,
  paginationCursorOfPost,
  transaction,
};
