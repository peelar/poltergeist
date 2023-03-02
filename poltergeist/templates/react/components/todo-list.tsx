import type { TodoList as TodoListType } from "../../../blocks";
import { RichText } from "./rich-text";

type TodoListProps = TodoListType;

export const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((listItem) => {
        return (
          <li
            style={{
              textDecoration: listItem.checked ? "line-through" : "initial",
            }}
          >
            <RichText {...listItem.richText} />
          </li>
        );
      })}
    </ul>
  );
};
