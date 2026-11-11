import { ChevronDown, ChevronUp, Layers3 } from "lucide-react";
import SchemaFieldsTable from "./SchemaFieldsTable";
import { useState } from "react";

export default function ModelSchemaCard({ model }) {
  const fields = model.fields || [];
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white" onClick={() => setExpanded(!expanded)}>
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
            <Layers3 size={19} />
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-900">{model.name}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Collection <span className="font-mono text-slate-700">{model.collection || "—"}</span>
              <span className="mx-2 text-slate-300">·</span>{fields.length} fields
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          {expanded ? "Fields detected" : "View fields"}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {expanded && <div className="border-t border-slate-200"><SchemaFieldsTable fields={fields} /></div>}
    </section>
  );
}
