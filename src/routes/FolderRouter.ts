import { Router } from "express";
import { FolderController } from "../controller/FolderController";

export const folderRouter = Router();

folderRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const folderController = new FolderController();
  if (!req.user || !id) {
    res.sendStatus(401);
    return;
  }
  const content = await folderController.getChildren(parseInt(id, 10), req.user);
  res.json(content);
});

folderRouter.post("/", async (req, res) => {
  const folderController = new FolderController();
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
    return;
  }
  try {
    await folderController.createFolder(
      {
        id: req.body.id,
      },
      user
    );
    res.end();
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        message: e.message,
      });
    } else {
      res.sendStatus(400);
    }
  }
});