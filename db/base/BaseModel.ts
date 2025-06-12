import { eq, InferInsertModel } from "drizzle-orm";
import { PgTable, AnyPgColumn } from "drizzle-orm/pg-core";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

// Generic constraint: T is a PgTable with a column called `id`
type HasId<T extends PgTable> = T & {
  id: AnyPgColumn;
};

class BaseModel<T extends HasId<PgTable>> {
  protected model: T;
  protected db = db;

  constructor(model: T) {
    this.model = model;
  }

  async create(data: InferInsertModel<T>) {
    console.log("Do your insert audit stuff here");
    return this.db.insert(this.model).values(data).returning();
  }

  async update(id: string, data: InferInsertModel<T>) {
    console.log("Do your update audit stuff here");
    return this.db
      .update(this.model)
      .set(data)
      .where(eq(this.model.id, id))
      .returning();
  }

  async delete(id: string) {
    console.log("Do your delete audit stuff here");
    return this.db.delete(this.model).where(eq(this.model.id, id)).returning();
  }

  async getById(id: string) {
    return this.db
      .select()
      .from(this.model as PgTable)
      .where(eq(this.model.id, id))
      .limit(1);
  }

  async getAll() {
    return this.db
      .select()
      .from(this.model as PgTable)
      .orderBy(this.model.id);
  }
}

export default BaseModel;
