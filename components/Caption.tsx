export default function Caption({ text }) {
  return (
    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 p-2 text-sm text-white transition-transform duration-300 ease-in-out group-hover:translate-y-0">
      <p>{text}</p>
    </div>
  );
}
