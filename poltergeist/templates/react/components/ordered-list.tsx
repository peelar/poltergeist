import type { OrderedList as OrderedListType } from "../../../blocks";
import { RichText } from "./rich-text";

type OrderedListProps = OrderedListType;

export const OrderedList = (props: OrderedListProps) => {
  return (
    <ol>
      {props.items.map((listItem) => {
        return (
          <li>
            <RichText {...listItem.richText} />
          </li>
        );
      })}
    </ol>
  );
};
