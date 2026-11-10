import { ChevronDown, Settings2 } from "lucide-react";

export default function GeneratorButton({ generator }) {
  if (!generator) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
        Generator not assigned
      </span>
    );
  }

  return (
    <button type="button" className="inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
      <Settings2 size={14} className="shrink-0 text-slate-400" />
      <span className="truncate font-mono">{generator}</span>
      <ChevronDown size={14} className="shrink-0 text-slate-400" />
    </button>
  );
}
