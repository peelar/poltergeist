import type { UnorderedList as UnorderedListType } from "../../../blocks";
import { RichText } from "./rich-text";

type UnorderedListProps = UnorderedListType;

export const UnorderedList = (props: UnorderedListProps) => {
  return (
    <ul>
      {props.items.map((listItem) => {
        return (
          <li>
            <RichText {...listItem.richText} />
          </li>
        );
      })}
    </ul>
  );
};
