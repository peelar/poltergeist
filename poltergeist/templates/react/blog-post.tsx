import type { BlogPost } from "../../blog";
import { matchStylePropsToStyles } from "../../styles";
import "../notion.css";

type Props = {
  post: BlogPost;
};

export const ReactBlogPost = ({ post }: Props) => {
  const { blocks, title } = post;
  return (
    <article>
      <h1>{title}</h1>
      {blocks.map((block) => {
        if (block.type === "text") {
          const classes = matchStylePropsToStyles(block);
          return <p className={classes}>{block.content}</p>;
        }

        if (block.type === "heading" && block.level === 1) {
          return (
            <h1>
              {block.richText.content.map((text) => {
                const classes = matchStylePropsToStyles(text);

                return <span className={classes}>{text.content}</span>;
              })}
            </h1>
          );
        }

        if (block.type === "heading" && block.level === 2) {
          return (
            <h2>
              {block.richText.content.map((text) => {
                const classes = matchStylePropsToStyles(text);

                return <span className={classes}>{text.content}</span>;
              })}
            </h2>
          );
        }

        if (block.type === "heading" && block.level === 3) {
          return (
            <h3>
              {block.richText.content.map((text) => {
                const classes = matchStylePropsToStyles(text);

                return <span className={classes}>{text.content}</span>;
              })}
            </h3>
          );
        }

        if (block.type === "unorderedList") {
          return (
            <ul>
              {block.items.map((listItem) => {
                return (
                  <li>
                    {listItem.richText.content.map((text) => {
                      const classes = matchStylePropsToStyles(text);
                      return <span className={classes}>{text.content}</span>;
                    })}
                  </li>
                );
              })}
            </ul>
          );
        }

        if (block.type === "orderedList") {
          return (
            <ol>
              {block.items.map((listItem) => {
                return (
                  <li>
                    {listItem.richText.content.map((text) => {
                      const classes = matchStylePropsToStyles(text);
                      return <span className={classes}>{text.content}</span>;
                    })}
                  </li>
                );
              })}
            </ol>
          );
        }

        if (block.type === "todoList") {
          return (
            <ul>
              {block.items.map((listItem) => {
                return (
                  <li
                    style={{
                      textDecoration: listItem.checked
                        ? "line-through"
                        : "initial",
                    }}
                  >
                    {listItem.richText.content.map((text) => {
                      const classes = matchStylePropsToStyles(text);
                      return <span className={classes}>{text.content}</span>;
                    })}
                  </li>
                );
              })}
            </ul>
          );
        }

        if (block.type === "divider") {
          return <hr />;
        }

        if (block.type === "break") {
          return <br />;
        }

        if (block.type === "image") {
          return <img src={block.url} alt={block.caption} />;
        }

        if (block.type === "richText") {
          return (
            <p>
              {block.content.map((text) => {
                const richTextStyles = matchStylePropsToStyles(text);
                return <span className={richTextStyles}>{text.content}</span>;
              })}
            </p>
          );
        }
      })}
    </article>
  );
};
