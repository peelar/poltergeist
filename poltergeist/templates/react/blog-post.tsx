import type { BlogPost as BlogPostType } from "../../blog";
import { Break } from "./components/break";
import { Divider } from "./components/divider";
import { Heading } from "./components/Heading";
import { Image } from "./components/image";
import { OrderedList } from "./components/ordered-list";
import { RichText } from "./components/rich-text";
import { Text } from "./components/text";
import { TodoList } from "./components/todo-list";
import { UnorderedList } from "./components/unordered-list";
import "../notion.css";

type Props = {
  post: BlogPostType;
};

export const BlogPost = ({ post }: Props) => {
  const { blocks, title } = post;
  return (
    <article>
      <h1>{title}</h1>
      {blocks.map((block) => {
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
      })}
    </article>
  );
};
