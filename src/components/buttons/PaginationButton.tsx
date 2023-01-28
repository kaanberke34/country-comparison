import { Button } from "react-daisyui";

interface IPaginationButtonProps {
  onClick?: (event: { currentTarget: { id: string } }) => void;
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
  activeId?: number;
}

export default function PaginationButton(props: IPaginationButtonProps) {
  const { text, id, className, color, onClick, activeId } = props;

  return (
    <Button
      style={{ margin: "10px", padding: "10px" }}
      className={className}
      onClick={onClick}
      id={id}
      color={color}
      active={id?.split("#")[1] == activeId ? true : false}
    >
      {text}
    </Button>
  );
}

PaginationButton.defaultProps = {
  text: "-",
  id: 0,
  className: "",
  color: "ghost",
  isActive: false,
};
