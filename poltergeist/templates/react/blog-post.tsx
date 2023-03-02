import type { BlogPost as BlogPostType } from "../../blog";
import "../../themes/notion.css";
import { Block } from "./components/block";

type Props = {
  post: BlogPostType;
};

export const BlogPost = ({ post }: Props) => {
  const { blocks, title } = post;
  return (
    <article>
      <h1>{title}</h1>
      <div>
        {blocks.map((block) => {
          return <Block {...block} />;
        })}
      </div>
    </article>
  );
};
