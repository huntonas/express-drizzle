import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const notes = pgTable("notes", {
  id: integer().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  userId: integer().references(() => users.id),
});
