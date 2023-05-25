import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { mongoURI } from "../../dev.js";

let db: Database;

export async function connect() {
  const client = new MongoClient();

  await client.connect(mongoURI);
  db = client.database("todos");
}

export function getDb() {
  return db;
}
