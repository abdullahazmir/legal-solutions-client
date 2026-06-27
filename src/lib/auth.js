import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI); // ✅ no quotes
const db = client.db(process.env.MONGO_DB_NAME || "better-auth");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
  user:{
    additionalFields: {
      role: {
        defaultValue: "client",
        input: true
      },
      plan:{
        defaultValue: 'client_basic',
        input: true
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

    plugins: [
      admin()
    ]

    
  });


  
  // ✅ Also allow these fields to be set during signup
  // user: {
  //     additionalFields: {
  //         role: { type: "string" },
  //         plan: { type: "string" },
  //     },
  // },