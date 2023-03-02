import type { Text as TextType } from "../../../blocks";
import { matchStylePropsToStyles } from "../../../styles";

type TextProps = TextType;

export const Text = (props: TextProps) => {
  const classes = matchStylePropsToStyles(props);
  return <span className={classes}>{props.content}</span>;
};
