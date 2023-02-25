import type {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type NotionColor = ParagraphBlockObjectResponse["paragraph"]["color"];

type StyleProps = {
  color: NotionColor;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
};

type Paragraph = {
  type: "paragraph";
  content: string;
  style: StyleProps;
};

type Heading = {
  type: "heading";
  level: 1 | 2 | 3;
  content: string;
  style: StyleProps;
};

export type Block = Paragraph | Heading;

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

export const mapNotionBlocks = (blocks: BlockObjectResponse[]): Block[] => {
  return blocks.reduce((prev, block) => {
    switch (block.type) {
      case "paragraph": {
        const b = block.paragraph.rich_text[0];

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

      default:
        throw new Error("Unsupported block type");
    }
  }, [] as Block[]);
};
