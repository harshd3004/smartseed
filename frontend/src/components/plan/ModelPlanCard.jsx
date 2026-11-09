import { Database, Rows3 } from "lucide-react";
import PlanFieldsTable from "./PlanFieldsTable";

export default function ModelPlanCard({ model }) {
  const fields = Array.isArray(model.fields)
    ? model.fields
    : Object.entries(model.fields || {}).map(([name, value]) => ({
        name,
        generator: typeof value === "string" ? value : value?.generator,
        options: typeof value === "object" ? value?.options || value?.params : undefined,
      }));

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
            <Database size={19} />
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-900">{model.name}</h2>
            <p className="mt-1 text-xs text-slate-500">
              Collection <span className="font-mono text-slate-700">{model.collection || "—"}</span>
              <span className="mx-2 text-slate-300">·</span>{fields.length} fields
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:w-auto sm:min-w-[220px]">
          <div className="flex items-center gap-2 text-slate-500">
            <Rows3 size={16} />
            <span className="text-xs font-medium">Documents to generate</span>
          </div>
          <input
            type="number"
            aria-label={`Document count for ${model.name}`}
            readOnly
            value={model.count ?? 100}
            className="w-20 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-right text-sm font-semibold tabular-nums text-slate-900 outline-none"
          />
        </div>
      </div>
      <PlanFieldsTable fields={fields} />
    </section>
  );
}
