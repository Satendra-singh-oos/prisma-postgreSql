import { Request, Response } from "express";
import prisma from "../prisma";

async function getAllUserWithName(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: "sara",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllUserWithStartEndName(req: Request, res: Response) {
  try {
    const startWithUsersName = await prisma.user.findMany({
      where: {
        name: {
          startsWith: "J",
        },
      },
    });

    const endWithUsersName = await prisma.user.findMany({
      where: {
        name: {
          endsWith: "n",
        },
      },
    });

    const userContains = await prisma.user.findMany({
      where: {
        name: {
          contains: "a",
          startsWith: "a",
        },
      },
    });

    const userIdAmongWithCertainNumber = await prisma.user.findMany({
      where: {
        id: {
          //   in: [1, 3],
          //   notIn: [1, 2],
          //   not: {
          //     in: [1, 2],
          //   },
          gt: 4, // the id is not gretter then 4
        },
      },
    });

    const opreationOnUserWithIdOrName = await prisma.user.findMany({
      where: {
        OR: [
          {
            id: { gt: 4 },
          },
          {
            name: {
              startsWith: "j",
            },
          },
        ],
      },
    });

    res.status(200).json(startWithUsersName);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOnlyUserWhosAllPostArePublished(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      where: {
        posts: {
          every: {
            published: true,
          },
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPublishedPostUser(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      where: {
        posts: {
          // none: {
          //   published: false,
          // },
          some: {
            published: true,
          },
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function creatUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    // const user = await prisma.user.create({
    //   data: {
    //     name: name,
    //     email: email,
    //     role: "USER",
    //     posts:{
    //       create:[
    //         {
    //           title:"bhjeajksrbkb",
    //           published:true,
    //           catgories:{
    //             connect:[
    //               {
    //                 id:1
    //               },
    //               {
    //                 id:2
    //               }
    //             ]
    //           }
    //         }
    //       ]
    //     }
    //   },
    // });

    //connectOrCreate(Toghther)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: "USER",
        posts: {
          create: [
            {
              title: "6428hkjrsabpe",
              published: true,
              catgories: {
                connectOrCreate: {
                  where: {
                    id: 3,
                  },
                  create: {
                    name: "NewCategory",
                  },
                },
              },
            },
          ],
        },
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function creatMultipleUser(req: Request, res: Response) {
  try {
    // const { name, email } = req.body;

    const user = await prisma.user.createMany({
      data: [
        { name: "new1", email: "new1@mail.com" },
        { name: "new1", email: "new1@mail.com" },
        { name: "new2", email: "new2@mail.com" },
        { name: "new3", email: "new3@mail.com" },
        { name: "new4", email: "new4@mail.com" },
      ],
      skipDuplicates: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

// update data
async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const { name, email } = req.body;

    const userId = Number(id);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateManyUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.updateMany({
      where: {
        name: {
          contains: "w",
        },
      },
      data: {
        role: "ADMIN",
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Upsert(if entiyt exist in db it will update else it will create new )

async function updateUserUpsert(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const { name, email } = req.body;

    const userId = Number(id);

    const user = await prisma.user.upsert({
      where: {
        id: userId,
      },

      update: {
        name: name,
        email: email,
      },
      create: {
        name: name,
        email: email,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

// deleteUser

async function delelteUser(req: Request, res: Response) {
  try {
    const { id } = req.query;

    const userId = Number(id);

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function delelteManyUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.deleteMany({
      where: {
        name: {
          contains: "z",
        },
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getAllUserWithName,
  getAllUserWithStartEndName,
  getOnlyUserWhosAllPostArePublished,
  getPublishedPostUser,
  creatUser,
  creatMultipleUser,
  updateUser,
  updateManyUser,
  updateUserUpsert,
  delelteUser,
  delelteManyUser,
};
