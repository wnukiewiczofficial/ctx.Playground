export default function Button({ children }) {
  return (
    <div className="w-auto bg-accent text-main text-center font-semibold text-2xl rounded-lg px-4 py-1">
      {children}
    </div>
  );
}
