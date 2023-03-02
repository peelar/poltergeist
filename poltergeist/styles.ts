import type { NotionColor, Text } from "./blocks";

const colorMap: Record<NotionColor, string[]> = {
  default: ["text-black"],
  gray: ["text-gray"],
  brown: ["text-brown"],
  orange: ["text-orange"],
  yellow: ["text-yellow"],
  green: ["text-green"],
  blue: ["text-blue"],
  purple: ["text-purple"],
  pink: ["text-pink"],
  red: ["text-red"],
  gray_background: ["color-black", "bg-gray"],
  brown_background: ["color-black", "bg-brown"],
  orange_background: ["color-black", "bg-orange"],
  yellow_background: ["color-black", "bg-yellow"],
  green_background: ["color-black", "bg-green"],
  blue_background: ["color-black", "bg-blue"],
  purple_background: ["color-black", "bg-purple"],
  pink_background: ["color-black", "bg-pink"],
  red_background: ["color-black", "bg-red"],
};

export const matchStylePropsToStyles = (text: Text) => {
  const styles = text.style;
  const classes = [
    ...(styles.bold ? ["font-weight-bold"] : []),
    ...(styles.italic ? ["font-style-italic"] : []),
    ...(styles.strikethrough ? ["line-through"] : []),
    ...(styles.underline ? ["underline"] : []),
    ...colorMap[styles.color],
  ];

  const className = classes.join(" ");

  return className;
};
