import { Alert } from "react-daisyui";

interface IAppAlertProps {
  text: string;
}

export default function AppAlert(props: IAppAlertProps) {
  const { text } = props;
  return <Alert>{text}</Alert>;
}

AppAlert.defaultProps = {
  text: "-",
};
