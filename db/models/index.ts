import User from "./user";
import Note from "./note";

const db = {
  user: new User(),
  note: new Note(),
};

export default db;
