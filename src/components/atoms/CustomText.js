export default function CustomText({ textStyle, children, textColor }) {
  return (
    <p
      className={`${textStyle ? styles[textStyle] : ""} 
        ${textColor != null ? `text-${textColor}Color` : "text-blue-500"}`}
    >
      {children}
    </p>
  );
}

const styles = {
  header: "text-center text-2xl font-bold pt-10",
};
