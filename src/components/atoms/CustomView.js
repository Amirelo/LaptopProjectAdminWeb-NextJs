export default function CustomView({ type, color, children }) {
  return (
    <div
      className={`${color ? `bg-${color}Color` : " "} ${type ? style[type] : 'p-0 m-0'}`}
    >
      {children}
    </div>
  );
}

const style = {
  login: "relative w-1/2 h-screen justify-center self-start",
  row: "flex flex-row",
  body: 'p-0 ms-72',
  bodySpacing: 'ps-6 pt-6',
};
