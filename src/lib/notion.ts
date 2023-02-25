import { Client } from "@notionhq/client";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type NotionResponse<TData = any> =
  | {
      ok: true;
      data: TData;
    }
  | {
      ok: false;
      error: {
        message: string;
      };
    };

export class Notion {
  client: Client;
  constructor() {
    this.client = new Client({
      auth: import.meta.env.NOTION_API_TOKEN,
    });
  }

  async getPosts(): Promise<NotionResponse<QueryDatabaseResponse>> {
    try {
      const response = await this.client.databases.query({
        database_id: import.meta.env.NOTION_DATABASE_ID,
      });

      return { data: response, ok: true };
    } catch (error: unknown) {
      return {
        ok: false,
        error: {
          message: "Something went wrong",
        },
      };
    }
  }
}
