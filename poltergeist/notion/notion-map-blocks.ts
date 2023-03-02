import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { factory, type Block, type Text } from "../blocks";
import { logger } from "../logger";

const notionRendererLogger = logger.child({ module: "notion-renderer" });

const transformNotionRichTextToPoltergeistText = (
  richText: RichTextItemResponse[]
): Text[] => {
  return richText.map((t) => factory.text(t.plain_text, t.annotations));
};

// todo: test
export const mapNotionBlocks = (
  notionBlocks: BlockObjectResponse[]
): Block[] => {
  notionRendererLogger.debug({ notionBlocks }, "mapNotionBlocks arguments");

  const blocks = notionBlocks.reduce((prev, block) => {
    switch (block.type) {
      case "paragraph": {
        const richText = block.paragraph.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }

        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.richText(content)];
      }

      case "heading_1": {
        const richText = block.heading_1.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }

        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.heading1(content)];
      }

      case "heading_2": {
        const richText = block.heading_2.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }

        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.heading2(content)];
      }

      case "heading_3": {
        const richText = block.heading_3.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }
        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.heading3(content)];
      }

      case "bulleted_list_item": {
        const richText = block.bulleted_list_item.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }

        const content = transformNotionRichTextToPoltergeistText(richText);

        const prevIndex = prev.length - 1;
        const previousBlock = prev[prevIndex];

        // 1. Check if the previous item is a list
        if (previousBlock?.type === "unorderedList") {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, factory.listItem(content)],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.unorderedList([factory.listItem(content)])];
      }

      case "numbered_list_item": {
        const richText = block.numbered_list_item.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }
        const content = transformNotionRichTextToPoltergeistText(richText);

        const prevIndex = prev.length - 1;
        const previousBlock = prev[prevIndex];

        // 1. Check if the previous item is a list
        if (previousBlock?.type === "orderedList") {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, factory.listItem(content)],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.orderedList([factory.listItem(content)])];
      }

      case "to_do": {
        const richText = block.to_do.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }

        const content = transformNotionRichTextToPoltergeistText(richText);

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
                factory.todoItem(content, block.to_do.checked),
              ],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [
          ...prev,
          factory.todoList([factory.todoItem(content, block.to_do.checked)]),
        ];
      }

      case "quote": {
        const richText = block.quote.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }
        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.quote(content)];
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

      case "code": {
        const richText = block.code.rich_text;

        if (!richText.length) {
          return [...prev, factory.break()];
        }
        const content = transformNotionRichTextToPoltergeistText(richText);

        return [...prev, factory.code(content)];
      }

      default: {
        notionRendererLogger.error(
          { type: block.type },
          "Unsupported block type"
        );
        throw new Error("Unsupported block type");
      }
    }
  }, [] as Block[]);

  notionRendererLogger.debug({ blocks }, "mapNotionBlocks result");
  return blocks;
};
