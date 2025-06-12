import { Request, Response } from "express";
import db from "../db";
import { User } from "../types/user";

export const createUser = async (req: Request, res: Response) => {
  const body = req.body as unknown as User;
  if (!body) {
    return res.status(400).json({ error: "No body provided" });
  }

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user: User = body;
  const { name, email, password }: User = user;

  const newUser = await db.user.create({ name, email, password });

  res.status(201).send(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const usersArray = await db.user.getAll();
  res.send(usersArray);
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await db.user.getUserByEmail(email);
  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body as unknown as User;
  const user = await db.user.update(id, body);
  res.send(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await db.user.delete(id);
  res.send(user);
};
