export default function Button({ className, children }) {
  return (
    <>
      <button className={`bg-yellow button ${className}`}>{children}</button>
    </>
  );
}
