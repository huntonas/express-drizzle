import BaseModel from "../base/BaseModel";
import { users } from "../schema";
import { eq } from "drizzle-orm";

class User extends BaseModel<typeof users> {
  constructor() {
    super(users);
  }

  async getUserByEmail(email: string) {
    return await this.db
      .select()
      .from(this.model)
      .where(eq(this.model.email, email));
  }
}

export default User;
