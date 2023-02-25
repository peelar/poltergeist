import { Client } from "@notionhq/client";
import { logger } from "../logger";
import { createFailureResponse, createSuccessResponse } from "../lib/api";

const notionClientLogger = logger.child({ module: "notion" });

export class NotionClient {
  private client: Client;
  constructor() {
    this.client = new Client({
      auth: import.meta.env.NOTION_API_TOKEN,
    });
  }

  async getPosts() {
    try {
      const response = await this.client.databases.query({
        database_id: import.meta.env.NOTION_DATABASE_ID,
      });

      notionClientLogger.debug({ response }, "Returning posts");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.debug({ error }, "Failed to get posts");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
  async getPost(pageId: string) {
    try {
      const response = await this.client.pages.retrieve({
        page_id: pageId,
      });
      notionClientLogger.debug({ response }, "Returning post");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.debug({ error }, "Failed to get blog post");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }

  async getBlocks(pageId: string) {
    try {
      const response = await this.client.blocks.children.list({
        block_id: pageId,
      });

      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.debug({ error }, "Failed to get blog post blocks");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
}
