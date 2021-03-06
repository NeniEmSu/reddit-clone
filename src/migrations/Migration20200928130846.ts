import { Migration } from '@mikro-orm/migrations';

export class Migration20200928130846 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "content" text not null);');
  }

}
