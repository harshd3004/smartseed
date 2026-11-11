import { ArrowRight, CheckCircle2, Database, FileCode2, Loader2, AlertCircle} from "lucide-react";

import ModelSchemaCard from "./ModelSchemaCard";
import { useState, useEffect } from "react";
import { useSession } from "../../context/SessionContext";
import { getExtractedSchema } from "../../api/schemaApi";
import { generatePlan } from "../../api/planApi";
import { useNavigate } from "react-router-dom";

export default function SchemaReview() {
  const [models, setModels] = useState([]);
  const [totalFields, setTotalFields] = useState(0);

  const { sessionId } = useSession();
  const navigate = useNavigate();

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    async function fetchIR() {
      if (!sessionId) {
        setStatus({
          type: "error",
          message: "Session not found. Please upload your models again.",
        });
        return;
      }

      try {
        const res = await getExtractedSchema(sessionId);

        if (!res.success) {
          throw new Error(res.message || "Failed to retrieve extracted schema.");
        }

        setModels(res.ir?.models || []);
      } catch (err) {
        setStatus({
          type: "error",
          message:
            err.response?.data?.message ||
            err.message ||
            "Unable to load the extracted schema.",
        });
      }
    }

    fetchIR();
  }, [sessionId]);

  useEffect(() => {
    setTotalFields(
      models.reduce((sum, model) => sum + (model.fields?.length || 0), 0)
    );
  }, [models]);

  const handleGeneratePlan = async () => {
    if (!sessionId || isGeneratingPlan) return;

    setIsGeneratingPlan(true);
    setStatus({
      type: "loading",
      message: "Generating your data generation plan. Please wait...",
    });

    try {
      const res = await generatePlan(sessionId);

      if (!res.success) {
        throw new Error(res.message || "Generation plan creation failed.");
      }

      setStatus({
        type: "success",
        message: "Generation plan created successfully! Redirecting...",
      });

      navigate("/plan");
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong while generating the plan.",
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const statusStyles = {
    loading: "border-blue-200 bg-blue-50 text-blue-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00834A]">
            <FileCode2 size={15} /> Schema analysis
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Schema Review
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review the Mongoose models and fields detected by SmartSeed before
            creating your generation plan.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
          <CheckCircle2 size={14} /> Analysis complete
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Database size={16} /> Detected models
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">
            {models.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileCode2 size={16} /> Detected fields
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">
            {totalFields}
          </p>
        </div>
      </div>

      {/* Model List */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">
          Detected models
        </h2>
        <span className="text-xs text-slate-400">
          {models.length} {models.length === 1 ? "model" : "models"}
        </span>
      </div>

      <div className="space-y-4">
        {models.map((model) => (
          <ModelSchemaCard
            key={`${model.name}-${model.collection}`}
            model={model}
          />
        ))}

        {!models.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
            No models were found in the schema response.
          </div>
        )}
      </div>

      {/* Footer and Generate Plan */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Check the detected fields and constraints before proceeding.
        </p>

        <button
          onClick={handleGeneratePlan}
          disabled={isGeneratingPlan || !models.length}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#13AA52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E9145] focus:outline-none focus:ring-2 focus:ring-[#13AA52] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGeneratingPlan ? (
            <>
              Generating Plan...
              <Loader2 size={16} className="animate-spin" />
            </>
          ) : (
            <>
              Generate Plan
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {/* Status Message */}
      {status.message && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${statusStyles[status.type]}`}
        >
          <div className="mt-0.5 shrink-0">
            {status.type === "loading" && (
              <Loader2 size={19} className="animate-spin" />
            )}

            {status.type === "success" && <CheckCircle2 size={19} />}

            {status.type === "error" && <AlertCircle size={19} />}
          </div>

          <div>
            <p className="font-semibold">
              {status.type === "loading" && "Generating Plan"}
              {status.type === "success" && "Success"}
              {status.type === "error" && "Generation Failed"}
            </p>

            <p className="mt-0.5 opacity-90">{status.message}</p>
          </div>
        </div>
      )}
    </main>
  );
}
