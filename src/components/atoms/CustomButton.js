export default function CustomButton({ children, onClick, background, buttonStyle }) {
  return (
    <button
      className={`${buttonStyle ? styles[buttonStyle] : ""} 
      ${background ? `bg-${background}Color` : " bg-primaryColor"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const styles = {
  button_main: "font-bold text-white py-3 rounded-md w-1/2 hover:py-4 duration-500",
};
