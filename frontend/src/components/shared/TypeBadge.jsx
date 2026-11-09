const typeStyles = {
  String: "bg-sky-50 text-sky-700 ring-sky-200",
  Number: "bg-violet-50 text-violet-700 ring-violet-200",
  Date: "bg-amber-50 text-amber-700 ring-amber-200",
  Boolean: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  ObjectId: "bg-slate-100 text-slate-700 ring-slate-200",
  Array: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Mixed: "bg-stone-100 text-stone-700 ring-stone-200",
};

export default function TypeBadge({ type }) {
  const style = typeStyles[type] || "bg-gray-100 text-gray-700 ring-gray-200";
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      {type || "Unknown"}
    </span>
  );
}
