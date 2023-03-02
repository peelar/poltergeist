import type { Quote as QuoteType } from "../../../blocks";
import { RichText } from "./rich-text";

type QuoteProps = QuoteType;

export const Quote = (props: QuoteProps) => {
  return (
    <blockquote className="font-style-italic">
      <RichText {...props.richText} />
    </blockquote>
  );
};
