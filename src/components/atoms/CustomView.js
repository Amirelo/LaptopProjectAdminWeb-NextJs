export default function CustomView({ type, color, children }) {
  return (
    <div
      className={`${color ? `bg-${color}Color` : " bg-backgroundColor"} ${type ? style[type] : style.login}`}
    >
      {children}
    </div>
  );
}

const style = {
  login: "relative w-1/2 h-screen justify-center self-start",
  row: "flex flex-row",
};
