interface Props {
  color?: "black" | "gray";
}

export const Separator: React.FC<Props> = ({ color = "gray" }) => {
  return (
    <hr
      className={`border-t border-gray-${
        color === "black" ? "900" : color === "gray" ? 400 : 300
      }`}
    />
  );
};
