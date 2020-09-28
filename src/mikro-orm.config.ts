import path from "path";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/user";

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[jt]s$/,
  },
  entities: [Post, User],
  type: "postgresql",
  dbName: "reddit",
  password: "neni",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
