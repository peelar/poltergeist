import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

type OrderedList = {
  type: "orderedList";
  items: ListItem[];
};

type TodoListItem = MakeBlockWithStyles<{
  type: "todoListItem";
  content: string;
  checked: boolean;
}>;

type TodoList = {
  type: "todoList";
  items: TodoListItem[];
};

type Quote = MakeBlockWithStyles<{
  type: "quote";
  content: string;
}>;

type Image = {
  type: "image";
  url: string;
  caption: string;
};

type Divider = {
  type: "divider";
};

type Code = {
  type: "code";
  content: string;
};

type Break = {
  type: "break";
};

export type Block =
  | Paragraph
  | Heading
  | UnorderedList
  | ListItem
  | OrderedList
  | TodoListItem
  | TodoList
  | Quote
  | Image
  | Divider
  | Code
  | Break;

export const getBlockStyleProps = (block: Block): StyleProps | undefined => {
  if (
    block.type !== "unorderedList" &&
    block.type !== "orderedList" &&
    block.type !== "todoList" &&
    block.type !== "image" &&
    block.type !== "divider" &&
    block.type !== "code" &&
    block.type !== "break"
  ) {
    return block.style;
  }
};

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

const todoListItemFactory = (
  text: string,
  checked: boolean,
  style: StyleProps
): TodoListItem => {
  return {
    type: "todoListItem",
    content: text,
    checked,
    style,
  };
};

const unorderedListFactory = (items: ListItem[]): UnorderedList => {
  return {
    type: "unorderedList",
    items,
  };
};

const orderedListFactory = (items: ListItem[]): OrderedList => {
  return {
    type: "orderedList",
    items,
  };
};

const todoListFactory = (items: TodoListItem[]): TodoList => {
  return {
    type: "todoList",
    items,
  };
};

const quoteFactory = (text: string, style: StyleProps): Quote => {
  return {
    type: "quote",
    content: text,
    style,
  };
};

const imageFactory = (url: string, caption: string): Image => {
  return {
    type: "image",
    url,
    caption,
  };
};

const dividerFactory = (): Divider => {
  return {
    type: "divider",
  };
};

const breakFactory = (): Break => {
  return {
    type: "break",
  };
};

const codeFactory = (text: string): Code => {
  return {
    type: "code",
    content: text,
  };
};

const factory = {
  paragraph: paragraphFactory,
  heading1: (text: string, style: StyleProps) => headingFactory(1, text, style),
  heading2: (text: string, style: StyleProps) => headingFactory(2, text, style),
  heading3: (text: string, style: StyleProps) => headingFactory(3, text, style),
  listItem: (text: string, style: StyleProps) => listItemFactory(text, style),
  todoItem: (text: string, checked: boolean, style: StyleProps) =>
    todoListItemFactory(text, checked, style),
  unorderedList: unorderedListFactory,
  orderedList: orderedListFactory,
  todoList: todoListFactory,
  quote: quoteFactory,
  image: imageFactory,
  divider: dividerFactory,
  code: codeFactory,
  break: breakFactory,
};

export default factory;
