import type { Image as ImageType } from "../../../blocks";

type ImageProps = ImageType;

export const Image = (props: ImageProps) => {
  return <img src={props.url} alt={props.caption} />;
};
