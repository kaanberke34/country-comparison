import { Card } from "react-daisyui";

interface IAppCardProps {
  onClick?: () => void;
  id: string;
  name: string;
  region: string;
  area: number;
  independent: boolean;
}

export default function AppCard(props: IAppCardProps) {
  const { name, region, area, independent } = props;
  return (
    <Card
      className="w-96 bg-primary text-primary-content"
      style={{ margin: "10px" }}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <p>Region: {region}</p>
        <p>Area: {area}</p>
        <p>independent: {independent ? "Yes" : "No"}</p>
      </Card.Body>
      <Card.Actions className="justify-end"></Card.Actions>
    </Card>
  );
}

AppCard.defaultProps = {
  id: 0,
  text: "-",
  name: "-",
  region: "-",
  area: 0,
  independent: false,
};
