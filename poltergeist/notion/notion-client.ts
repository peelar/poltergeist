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
      notionClientLogger.error(
        "You must provide NOTION_API_TOKEN as env var. See .env.example"
      );
      throw new Error(
        "You must provide NOTION_API_TOKEN as env var. See .env.example"
      );
    }

    this.client = new Client({
      auth: import.meta.env.NOTION_API_TOKEN,
    });
  }
  async getDatabase(databaseId: string) {
    try {
      const response = await this.client.databases.query({
        database_id: databaseId,
      });

      notionClientLogger.info({ response }, "Returning database");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.error({ error }, "Failed to get database");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }
  async getPage(pageId: string) {
    try {
      const response = await this.client.pages.retrieve({
        page_id: pageId,
      });
      notionClientLogger.info({ response }, "Returning page");
      return createSuccessResponse(response);
    } catch (error: unknown) {
      notionClientLogger.error({ error }, "Failed to get page");
      return createFailureResponse("Something went wrong", "UNKNOWN");
    }
  }

  async getPageBlocks(pageId: string) {
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
