import type {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { logger } from "../../logger";

const notionRendererLogger = logger.child({ module: "notion-renderer" });

export type NotionColor = ParagraphBlockObjectResponse["paragraph"]["color"];

type StyleProps = {
  color: NotionColor;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
};

type MakeBlockWithStyles<T extends Record<string, any>> = T & {
  style: StyleProps;
};

type Paragraph = MakeBlockWithStyles<{
  type: "paragraph";
  content: string;
}>;

type Heading = MakeBlockWithStyles<{
  type: "heading";
  level: 1 | 2 | 3;
  content: string;
}>;

type ListItem = MakeBlockWithStyles<{
  type: "listItem";
  content: string;
}>;

type UnorderedList = {
  type: "unorderedList";
  items: ListItem[];
};

export type Block = Paragraph | Heading | UnorderedList | ListItem;

const paragraphFactory = (text: string, style: StyleProps): Paragraph => {
  return {
    type: "paragraph",
    content: text,
    style,
  };
};

const headingFactory = (
  level: 1 | 2 | 3,
  text: string,
  style: StyleProps
): Heading => {
  return {
    type: "heading",
    level,
    content: text,
    style,
  };
};

const listItemFactory = (text: string, style: StyleProps): ListItem => {
  return {
    type: "listItem",
    content: text,
    style,
  };
};

const listFactory = (items: ListItem[]): UnorderedList => {
  return {
    type: "unorderedList",
    items,
  };
};

export const getBlockStyleProps = (block: Block): StyleProps | undefined => {
  if (block.type !== "unorderedList") {
    return block.style;
  }
};

// todo: test
export const mapNotionBlocks = (
  notionBlocks: BlockObjectResponse[]
): Block[] => {
  notionRendererLogger.info({ notionBlocks }, "mapNotionBlocks arguments");

  const blocks = notionBlocks.reduce((prev, block, currentIndex) => {
    switch (block.type) {
      case "paragraph": {
        const b = block.paragraph.rich_text[0];

        // todo: refactor
        if (!b) {
          return prev;
        }
        return [...prev, paragraphFactory(b?.plain_text, b?.annotations)];
      }

      case "heading_1": {
        const b = block.heading_1.rich_text[0];

        if (!b) {
          return prev;
        }
        return [...prev, headingFactory(1, b?.plain_text, b?.annotations)];
      }

      case "heading_2": {
        const b = block.heading_2.rich_text[0];

        if (!b) {
          return prev;
        }
        return [...prev, headingFactory(2, b?.plain_text, b?.annotations)];
      }

      case "heading_3": {
        const b = block.heading_3.rich_text[0];

        if (!b) {
          return prev;
        }

        return [...prev, headingFactory(3, b?.plain_text, b?.annotations)];
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
          notionRendererLogger.debug(
            { previousBlock, currentBlock: b },
            "Previous block is a list"
          );
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [
                ...previousBlock.items,
                listItemFactory(b?.plain_text, b?.annotations),
              ],
            },
          ];
        }

        // 3. If it isn't, create a new list and add the current item to it
        notionRendererLogger.debug(
          { previousBlock },
          "Previous block is not a list"
        );
        return [
          ...prev,
          listFactory([listItemFactory(b?.plain_text, b?.annotations)]),
        ];
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
