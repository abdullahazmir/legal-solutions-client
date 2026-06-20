import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI); // ✅ no quotes
const db = client.db(process.env.MONGO_DB_NAME || "better-auth");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user:{
    additionalFields: {
      role: {
        default: "client",
      }
    }
  }
});