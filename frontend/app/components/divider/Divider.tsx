import "./Divider.css";

const Divider = ({ height }: { height: number }) => {
  return (
    <div
      className="h-full w-[1px] divider mx-[0.5em]"
      style={{ height: `${height}em` }}
    />
  );
};

export default Divider;
