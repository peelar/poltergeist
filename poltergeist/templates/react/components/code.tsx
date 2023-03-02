import type { Code as CodeType } from "../../../blocks";
import { RichText } from "./rich-text";

type CodeProps = CodeType;

export const Code = (props: CodeProps) => {
  return (
    <pre className="bg-gray p-2">
      <code>
        <RichText {...props.richText} />
      </code>
    </pre>
  );
};
