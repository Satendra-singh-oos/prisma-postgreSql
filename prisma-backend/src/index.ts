import dotenv from "dotenv";
import { app } from "./app";

// dotenv.config({
//   path: "./env",
// });

const PORT: number = 9000;

app.listen(PORT, () => {
  console.log(`Server is up and running at port : ${PORT}`);
});
