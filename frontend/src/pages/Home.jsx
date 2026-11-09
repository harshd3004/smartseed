import { Sparkles, Database, Code2 } from "lucide-react";
import UploadForm from "../components/UploadForm.jsx";

export default function Home({ uploads, onUploaded, onDeleted }) {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F8FAF9] px-4 py-12 sm:px-6 lg:py-16">

      <div className="mx-auto flex max-w-5xl flex-col items-center">

        {/* Hero Section */}
        <section className="mb-10 max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#00684A]">
            <Sparkles size={14} />
            AI-Powered Synthetic Data Generation
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Generate Synthetic Data
            <span className="mt-2 block text-[#13AA52]">
              With SmartSeed
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Upload your Mongoose model files and let SmartSeed analyze
            your schemas to create realistic synthetic data effortlessly.
          </p>

        </section>

        {/* Upload Section */}
        <section className="w-full max-w-2xl">
          <UploadForm onUploaded={onUploaded} />
        </section>

        {/* Feature Highlights */}
        <section className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
              <Code2 size={19} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Schema Analysis
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Detect model fields
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
              <Sparkles size={19} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                AI Assistance
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Smart generator mapping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
              <Database size={19} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Data Generation
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Generate test datasets
              </p>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}