import BaseModel from "../base/BaseModel";
import { InferInsertModel } from "drizzle-orm";
import { notes } from "../schema";

class Note extends BaseModel<typeof notes> {
  constructor() {
    super(notes);
  }

  // exmaple of an override
  async create(data: InferInsertModel<typeof notes>) {
    console.log("Do your differentaudit stuff here");
    return await this.db.insert(this.model).values(data).returning();
  }
}

export default Note;
