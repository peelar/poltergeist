import { Client } from "@notionhq/client";
import { logger } from "../logger";
import {
  createFailureResponse,
  createSuccessResponse,
} from "../../src/lib/api";

const notionClientLogger = logger.child({ module: "notion" });

export class NotionClient {
  private client: Client;
  constructor() {
    if (!import.meta.env.NOTION_API_TOKEN) {
      throw new Error(
        "You must provide NOTION_API_TOKEN as env var. See .env.example"
      );
    }

    this.client = new Client({
      auth: import.meta.env.NOTION_API_TOKEN,
    });
  }

  async getPosts() {
    try {
      if (!import.meta.env.NOTION_DATABASE_ID) {
        throw new Error(
          "You must provide NOTION_DATABASE_ID as env var. See .env.example"
        );
      }

      const response = await this.client.databases.query({
        database_id: import.meta.env.NOTION_DATABASE_ID,
      });

      notionClientLogger.info({ response }, "Returning posts");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.error({ error }, "Failed to get posts");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
  async getPost(pageId: string) {
    try {
      const response = await this.client.pages.retrieve({
        page_id: pageId,
      });
      notionClientLogger.info({ response }, "Returning post");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.error({ error }, "Failed to get blog post");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }

  async getBlocks(pageId: string) {
    try {
      const response = await this.client.blocks.children.list({
        block_id: pageId,
      });

      notionClientLogger.info({ response }, "Returning blocks");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.error({ error }, "Failed to get blog post blocks");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
}
