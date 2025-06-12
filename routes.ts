import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "./controllers/user";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/users", async (req, res) => {
  console.log(req.body);
  await createUser(req, res);
});

router.get("/users", async (req, res) => {
  await getUsers(req, res);
});

router.get("/users/:email", async (req, res) => {
  await getUserByEmail(req, res);
});

router.put("/users/:id", async (req, res) => {
  await updateUser(req, res);
});

router.delete("/users/:id", async (req, res) => {
  await deleteUser(req, res);
});

export default router;
