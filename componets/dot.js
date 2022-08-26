const Dot = (props) => {
  const { color, x, y, size, index, onClick } = props;
  const dotStyle = {
    backgroundColor: color,
    height: `${size}px`,
    width: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
  };
  return (
    <div draggable="true" 

      className="absolute rounded-full"
      style={dotStyle}
      onDrag={() => onClick(index)}
    />
  );
};
export default Dot;