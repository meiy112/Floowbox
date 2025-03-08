import "./Divider.css";

const Divider = ({
  height,
  width,
  isHorizontal = false,
}: {
  height?: number;
  width?: number;
  isHorizontal?: boolean;
}) => {
  return (
    <div
      className={`${
        isHorizontal ? "horizontal" : "vertical"
      } divider mx-[0.5em]`}
      style={{ height: `${height}em`, width: `${width}em` }}
    />
  );
};

export default Divider;
