export default function Location({ text }) {
  return (
    <div className="absolute left-2 top-2 flex rounded-md bg-teal-300 p-1 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-map-pin"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <p className="text-xs font-semibold uppercase text-teal-900">{text}</p>
    </div>
  );
}
