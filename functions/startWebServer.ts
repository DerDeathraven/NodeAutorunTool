import express from "express";
import { PORT } from "../constants";
export const app = express();

export function startWebServer() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
