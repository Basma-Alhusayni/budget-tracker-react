type Props = {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export default function Button({
  label,
  type = "button",
  onClick,
  disabled,
  style,
  className,
}: Props) {
  const baseStyle: React.CSSProperties = {
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1rem",
    padding: "8px 16px",
    backgroundColor: "#10750f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...style }}
      className={className}
    >
      {label}
    </button>
  );
}
