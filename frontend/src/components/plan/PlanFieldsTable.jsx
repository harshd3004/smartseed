import { AlertCircle, CheckCircle2, Sparkles, Workflow } from "lucide-react";
import TypeBadge from "../shared/TypeBadge";
import GeneratorButton from "./GeneratorButton";

function SourceLabel({ source }) {
  if (!source) return <span className="text-xs text-slate-400">—</span>;
  const isAI = source.toLowerCase() === "ai";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${isAI ? "text-violet-700" : "text-slate-500"}`}>
      {isAI ? <Sparkles size={13} /> : <Workflow size={13} />}
      {isAI ? "AI selected" : source.toLowerCase() === "rule" ? "Rule based" : source}
    </span>
  );
}

function StatusLabel({ status, generator }) {
  const resolved = status?.toLowerCase() === "resolved" || (!status && Boolean(generator));
  if (resolved) {
    return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700"><CheckCircle2 size={14} /> Resolved</span>;
  }
  return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700"><AlertCircle size={14} /> Unresolved</span>;
}

function OptionsSummary({ options }) {
  if (!options || !Object.keys(options).length) return <span className="text-xs text-slate-400">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {Object.entries(options).map(([key, value]) => (
        <span key={key} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
          {key}: <span className="font-medium text-slate-700">{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
        </span>
      ))}
    </div>
  );
}

export default function PlanFieldsTable({ fields = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3 font-semibold">Field name</th>
            <th className="px-5 py-3 font-semibold">Type</th>
            <th className="px-5 py-3 font-semibold">Assigned generator</th>
            <th className="px-5 py-3 font-semibold">Source</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {fields.map((field) => (
            <tr key={field.name} className="align-middle hover:bg-slate-50/70">
              <td className="px-5 py-3.5 font-mono text-[13px] font-medium text-slate-800">{field.name}</td>
              <td className="px-5 py-3.5"><TypeBadge type={field.sourceType} /></td>
              <td className="px-5 py-3.5"><GeneratorButton generator={field.generator} /></td>
              <td className="px-5 py-3.5"><SourceLabel source={field.source} /></td>
              <td className="px-5 py-3.5"><StatusLabel status={field.status} generator={field.generator} /></td>
              <td className="px-5 py-3.5"><OptionsSummary options={field.options || field.params} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
