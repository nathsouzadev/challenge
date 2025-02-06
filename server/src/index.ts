import express, { Request, Response, Router } from "express";
import multer from "multer";
import { save } from "./service";
import path from "path";
import cors from "cors";

export const app = express();
const router = Router();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: path.join("./uploads"),
  filename: (_, file, cb) => {
    const date = new Date().toISOString();
    const fileName = `${file.originalname}_${date}`;
    cb(null, fileName);
  },
});

router.get("/", (_: Request, res: Response) => {
  res.json({ message: "API Health" });
});

router.post(
  "/csv",
  multer({ storage }).single("file"),
  async (req: Request, res: Response) => {
    try {
      if (req.file) {
        const data = await save(req.file.path);
        res.json({ message: "CSV uploaded", data });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
