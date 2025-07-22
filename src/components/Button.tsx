type Props = {
  label: string;
  type?: "button" | "submit";
};

export default function Button({ label, type = "button" }: Props) {
  return <button type={type}>{label}</button>;
}
