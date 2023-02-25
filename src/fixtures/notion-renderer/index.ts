import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { logger } from "../../logger";
import factory, { type Block } from "./blocks";

const notionRendererLogger = logger.child({ module: "notion-renderer" });

// todo: test
export const mapNotionBlocks = (
  notionBlocks: BlockObjectResponse[]
): Block[] => {
  notionRendererLogger.info({ notionBlocks }, "mapNotionBlocks arguments");

  const blocks = notionBlocks.reduce((prev, block) => {
    switch (block.type) {
      case "paragraph": {
        const b = block.paragraph.rich_text[0];

        // todo: refactor
        if (!b) {
          return prev;
        }
        return [...prev, factory.paragraph(b?.plain_text, b?.annotations)];
      }

      case "heading_1": {
        const b = block.heading_1.rich_text[0];

        if (!b) {
          return prev;
        }
        return [...prev, factory.heading1(b?.plain_text, b?.annotations)];
      }

      case "heading_2": {
        const b = block.heading_2.rich_text[0];

        if (!b) {
          return prev;
        }
        return [...prev, factory.heading2(b?.plain_text, b?.annotations)];
      }

      case "heading_3": {
        const b = block.heading_3.rich_text[0];

        if (!b) {
          return prev;
        }

        return [...prev, factory.heading3(b?.plain_text, b?.annotations)];
      }

      case "bulleted_list_item": {
        const b = block.bulleted_list_item.rich_text[0];

        if (!b) {
          return prev;
        }

        const prevIndex = prev.length - 1;
        const previousBlock = prev[prevIndex];

        // 1. Check if the previous item is a list
        if (previousBlock?.type === "unorderedList") {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [
                ...previousBlock.items,
                factory.listItem(b?.plain_text, b?.annotations),
              ],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [
          ...prev,
          factory.unorderedList([
            factory.listItem(b?.plain_text, b?.annotations),
          ]),
        ];
      }

      case "numbered_list_item": {
        const b = block.numbered_list_item.rich_text[0];

        if (!b) {
          return prev;
        }

        const prevIndex = prev.length - 1;
        const previousBlock = prev[prevIndex];

        // 1. Check if the previous item is a list
        if (previousBlock?.type === "orderedList") {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [
                ...previousBlock.items,
                factory.listItem(b?.plain_text, b?.annotations),
              ],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [
          ...prev,
          factory.orderedList([
            factory.listItem(b?.plain_text, b?.annotations),
          ]),
        ];
      }

      case "to_do": {
        const b = block.to_do.rich_text[0];

        if (!b) {
          return prev;
        }

        const prevIndex = prev.length - 1;
        const previousBlock = prev[prevIndex];

        // 1. Check if the previous item is a list
        if (previousBlock?.type === "todoList") {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [
                ...previousBlock.items,
                factory.todoItem(
                  b.plain_text,
                  block.to_do.checked,
                  b?.annotations
                ),
              ],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [
          ...prev,
          factory.todoList([
            factory.todoItem(
              b?.plain_text,
              block.to_do.checked,
              b?.annotations
            ),
          ]),
        ];
      }

      case "quote": {
        const b = block.quote.rich_text[0];

        if (!b) {
          return prev;
        }

        return [...prev, factory.quote(b?.plain_text, b?.annotations)];
      }

      case "image": {
        const b = block.image;
        const url = b.type === "external" ? b.external.url : b.file.url;
        const caption = b.caption?.[0]?.plain_text;

        return [...prev, factory.image(url, caption)];
      }

      case "divider": {
        return [...prev, factory.divider()];
      }

      default: {
        notionRendererLogger.error({ block }, "Unsupported block type");
        throw new Error("Unsupported block type");
      }
    }
  }, [] as Block[]);

  notionRendererLogger.info({ blocks }, "mapNotionBlocks result");
  return blocks;
};
