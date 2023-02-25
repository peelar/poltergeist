import { isFullBlock, isFullPage } from "@notionhq/client";
import { logger } from "../logger";
import { createFailureResponse, createSuccessResponse } from "../lib/api";
import { NotionClient } from "./notion-client";

const blogLogger = logger.child({ module: "notion" });

export class Blog {
  private notion: NotionClient;
  constructor() {
    this.notion = new NotionClient();
  }

  async getPostsPaths() {
    try {
      const response = await this.notion.getPosts();
      if (!response.ok) {
        return response;
      }

      const pages = response.data.results.filter(isFullPage);

      const paths = pages.map((page) => {
        const post = page.properties.Post;
        const slug = post.type === "title" ? post.title?.[0].plain_text : "";
        return { params: { slug }, props: { id: page.id } };
      });

      blogLogger.trace({ paths }, "Returning paths");
      return createSuccessResponse(paths);
    } catch (error) {
      blogLogger.error({ error }, "Failed to get posts paths");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }

  async getPost(id: string) {
    try {
      const postResponse = await this.notion.getPost(id);
      if (!postResponse.ok) {
        return postResponse;
      }

      if (!isFullPage(postResponse.data)) {
        blogLogger.error("Failed to read blog post");
        return createFailureResponse("Something went wrong", "UNKNOWN");
      }

      const page = postResponse.data;
      const blocksResponse = await this.notion.getBlocks(id);

      if (!blocksResponse.ok) {
        return blocksResponse;
      }

      const blocks = blocksResponse.data.results.filter(isFullBlock);
      blogLogger.trace({ page, blocks }, "Returning blog post data");
      return createSuccessResponse({ page, blocks });
    } catch (error) {
      blogLogger.error({ error }, "Failed to get blog post");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
}
