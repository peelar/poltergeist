import type { Heading as HeadingType } from "../../../blocks";
import { RichText } from "./rich-text";

type HeadingProps = HeadingType;

export const Heading = (props: HeadingProps) => {
  if (props.level === 1) {
    return (
      <h1>
        <RichText {...props.richText} />
      </h1>
    );
  }

  if (props.level === 2) {
    return (
      <h2>
        <RichText {...props.richText} />
      </h2>
    );
  }

  if (props.level === 3) {
    return (
      <h3>
        <RichText {...props.richText} />
      </h3>
    );
  }

  return null;
};
