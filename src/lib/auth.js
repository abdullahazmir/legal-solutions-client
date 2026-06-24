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
      },
      plan:{
        default: 'client_basic'
      }
    }
  },
  // ✅ Add this — expose extra user fields in the session
  session: {
        additionalFields: {
            role: { type: "string" },
            plan: { type: "string" },
        },
    },

    // ✅ Also allow these fields to be set during signup
    // user: {
    //     additionalFields: {
    //         role: { type: "string" },
    //         plan: { type: "string" },
    //     },
    // },

});