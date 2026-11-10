import { ArrowRight, CheckCircle2, Database, Sparkles } from "lucide-react";
import ModelPlanCard from "./ModelPlanCard";

export default function GenerationPlan({ plan }) {
  const models = plan?.models || [];
  const totalFields = models.reduce((sum, model) => {
    const count = Array.isArray(model.fields) ? model.fields.length : Object.keys(model.fields || {}).length;
    return sum + count;
  }, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00834A]">
            <Sparkles size={15} /> Generation setup
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Generation Plan</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review and customize how synthetic data will be generated for each model.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
          <CheckCircle2 size={14} /> AI plan generated
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-600"><Database size={16} className="text-slate-400" /> <strong className="text-slate-900">{models.length}</strong> models</span>
        <span className="inline-flex items-center gap-2 text-slate-600"><span className="h-1 w-1 rounded-full bg-slate-300" /> <strong className="text-slate-900">{totalFields}</strong> fields configured</span>
      </div>

      <div className="space-y-5">
        {models.map((model) => <ModelPlanCard key={`${model.name}-${model.collection}`} model={model} />)}
        {!models.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
            No models are available in this generation plan.
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">Unresolved fields should be assigned a supported generator before generation.</p>
        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#13AA52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E9145] focus:outline-none focus:ring-2 focus:ring-[#13AA52] focus:ring-offset-2">
          Generate Data <ArrowRight size={16} />
        </button>
      </div>
    </main>
  );
}
