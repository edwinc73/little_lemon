export default function Button({
  className,
  children,
  type,
  disabled = false,
}) {
  return (
    <>
      <button
        type={type ? type : ""}
        disabled={disabled}
        className={`bg-yellow button ${className}`}
      >
        {children}
      </button>
    </>
  );
}
