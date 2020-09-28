import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title, content });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | string> {
    const post = await em.findOne(Post, { id });
    if (!post)
      throw new Error(
        `Unfortunately the post with the id of ${id} doesn't exist.`
      );
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    if (typeof content !== "undefined") {
      post.content = content;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean | number> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
