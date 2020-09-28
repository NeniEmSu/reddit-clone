import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryKey({ type: "uuid" })
  uuid: string = uuidv4();

  @Field(() => String)
  @Property({ type: "date", onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  @Field()
  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  password!: string;
}
