export default function Badge({ text }) {
  return (
    <div className="absolute right-2 top-2">
      <p className="rounded-md bg-teal-300 p-1 text-xs font-semibold uppercase text-teal-900">
        {text}
      </p>
    </div>
  );
}
