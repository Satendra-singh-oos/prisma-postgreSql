import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
// app.use(express.static("public"));

import postRoute from "./routes/posts.routes";
import userRoute from "./routes/users.routes";

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);

export { app };
