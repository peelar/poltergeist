import type { RichText as RichTextType } from "../../../blocks";
import { Text } from "./text";

type RichTextProps = RichTextType;

export const RichText = (props: RichTextProps) => {
  return (
    <>
      {props.content.map((text) => {
        return <Text {...text} />;
      })}
    </>
  );
};
