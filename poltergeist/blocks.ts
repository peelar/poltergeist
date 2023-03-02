import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionColor = ParagraphBlockObjectResponse["paragraph"]["color"];

// todo: change StyleProps to not rely on Notion types, this file is meant to be platform-agnostic
// so that blocks can be agnostic of provider
type StyleProps = {
  color: NotionColor;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
};

export type Text = {
  type: "text";
  content: string;
  style: StyleProps;
};

export type RichText = {
  type: "richText";
  content: Text[];
};

export type Heading = {
  type: "heading";
  level: 1 | 2 | 3;
  richText: RichText;
};

export type ListItem = {
  type: "listItem";
  richText: RichText;
};

export type UnorderedList = {
  type: "unorderedList";
  items: ListItem[];
};

export type OrderedList = {
  type: "orderedList";
  items: ListItem[];
};

export type TodoListItem = {
  type: "todoListItem";
  richText: RichText;
  checked: boolean;
};

export type TodoList = {
  type: "todoList";
  items: TodoListItem[];
};

export type Quote = {
  type: "quote";
  richText: RichText;
};

export type Image = {
  type: "image";
  url: string;
  caption: string;
};

export type Divider = {
  type: "divider";
};

export type Code = {
  type: "code";
  richText: RichText;
};

export type Break = {
  type: "break";
};

export type Block =
  | Text
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
  | Break
  | RichText;

const textFactory = (content: string, style: StyleProps): Text => {
  return {
    type: "text",
    content,
    style,
  };
};

const richTextFactory = (content: Text[]): RichText => {
  return {
    type: "richText",
    content,
  };
};

const headingFactory = (level: 1 | 2 | 3, text: Text[]): Heading => {
  const richText = richTextFactory(text);

  return {
    type: "heading",
    level,
    richText,
  };
};

const listItemFactory = (text: Text[]): ListItem => {
  const richText = richTextFactory(text);

  return {
    type: "listItem",
    richText,
  };
};

const todoListItemFactory = (text: Text[], checked: boolean): TodoListItem => {
  const richText = richTextFactory(text);

  return {
    type: "todoListItem",
    richText,
    checked,
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

const quoteFactory = (text: Text[]): Quote => {
  const richText = richTextFactory(text);

  return {
    type: "quote",
    richText,
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

const codeFactory = (text: Text[]): Code => {
  const richText = richTextFactory(text);
  return {
    type: "code",
    richText,
  };
};

export const factory = {
  text: textFactory,
  heading1: (text: Text[]) => headingFactory(1, text),
  heading2: (text: Text[]) => headingFactory(2, text),
  heading3: (text: Text[]) => headingFactory(3, text),
  listItem: (text: Text[]) => listItemFactory(text),
  todoItem: (text: Text[], checked: boolean) =>
    todoListItemFactory(text, checked),
  unorderedList: unorderedListFactory,
  orderedList: orderedListFactory,
  todoList: todoListFactory,
  quote: quoteFactory,
  image: imageFactory,
  divider: dividerFactory,
  code: codeFactory,
  break: breakFactory,
  richText: richTextFactory,
};
