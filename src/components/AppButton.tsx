import { Button } from "react-daisyui";

interface IAppButtonProps {
  onClick?: () => void;
  text: string;
  id?: string;
  className?: string;
  color?:
    | "ghost"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | undefined;
}

export default function AppButton(props: IAppButtonProps) {
  const { text, id, className, color, onClick } = props;
  return (
    <Button
      style={{ margin: "10px", padding: "10px" }}
      className={className}
      onClick={onClick}
      id={id}
      color={color}
    >
      {text}
    </Button>
  );
}

AppButton.defaultProps = {
  text: "-",
  id: 0,
  className: "",
  color: "ghost",
};
