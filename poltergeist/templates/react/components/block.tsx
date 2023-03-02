import type { Block as BlockType } from "../../../blocks";
import { Break } from "./break";
import { Code } from "./code";
import { Divider } from "./divider";
import { Heading } from "./Heading";
import { Image } from "./image";
import { OrderedList } from "./ordered-list";
import { Quote } from "./quote";
import { RichText } from "./rich-text";
import { Text } from "./text";
import { TodoList } from "./todo-list";
import { UnorderedList } from "./unordered-list";

export const Block = (block: BlockType) => {
  if (block.type === "text") {
    return (
      <p>
        <Text {...block} />
      </p>
    );
  }

  if (block.type === "heading") {
    return <Heading {...block} />;
  }

  if (block.type === "unorderedList") {
    return <UnorderedList {...block} />;
  }

  if (block.type === "orderedList") {
    return <OrderedList {...block} />;
  }

  if (block.type === "todoList") {
    return <TodoList {...block} />;
  }

  if (block.type === "divider") {
    return <Divider />;
  }

  if (block.type === "break") {
    return <Break />;
  }

  if (block.type === "image") {
    return <Image {...block} />;
  }

  if (block.type === "richText") {
    return (
      <p>
        <RichText {...block} />
      </p>
    );
  }

  if (block.type === "quote") {
    return <Quote {...block} />;
  }

  if (block.type === "code") {
    return <Code {...block} />;
  }

  return <span style={{ color: "red" }}>Unsupported element</span>;
};
