import {
  Upload,
  ScanSearch,
  BrainCircuit,
  Database,
  ArrowDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      icon: <Upload size={23} />,
      title: "Upload Your Mongoose Models",
      description:
        "Start by uploading your JavaScript Mongoose model files. SmartSeed accepts your existing model definitions as the starting point for data generation.",
      details: [
        "Upload one or multiple .js model files.",
        "No need to manually define your fields.",
      ],
    },
    {
      number: "02",
      icon: <ScanSearch size={23} />,
      title: "Schema Analysis",
      description:
        "SmartSeed examines your uploaded models and identifies their fields, data types, and available constraints such as required values, enums, and ranges.",
      details: [
        "Identifies detected models and collections.",
        "Extracts field types and schema constraints.",
      ],
    },
    {
      number: "03",
      icon: <BrainCircuit size={23} />,
      title: "Intelligent Generator Selection",
      description:
        "SmartSeed analyzes the meaning and characteristics of each field to suggest suitable data generators using AI assistance and predefined rules.",
      details: [
        "Maps fields to appropriate generators.",
        "Creates a generation plan for review and customization.",
      ],
    },
    {
      number: "04",
      icon: <Database size={23} />,
      title: "Generate Synthetic Data",
      description:
        "Once the generation plan is ready, SmartSeed uses the assigned generators to create synthetic records that follow your model structure and supported constraints.",
      details: [
        "Generate the requested number of records.",
        "Obtain structured synthetic datasets.",
      ],
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F8FAF9] px-4 py-12 sm:px-6 lg:py-16">

      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <section className="mb-14 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#00684A]">
            <Sparkles size={14} />
            HOW SMARTSEED WORKS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From Schema to
            <span className="block text-[#13AA52]">
              Synthetic Data.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Creating synthetic data doesn't have to be complicated.
            Follow four simple steps to transform your Mongoose models
            into structured test datasets.
          </p>

        </section>

        {/* Process Steps */}
        <section className="relative mx-auto max-w-3xl">

          {/* Vertical Connector */}
          <div className="absolute bottom-20 left-6.75 top-10 hidden w-px bg-emerald-200 sm:block" />

          <div className="space-y-6">

            {steps.map((step, index) => (
              <div key={step.number} className="relative">

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">

                  {/* Step Icon */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white text-[#00684A] shadow-sm">
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-emerald-300 hover:shadow-sm sm:p-6">

                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                      <span className="text-xs font-bold tracking-widest text-[#13AA52]">
                        STEP {step.number}
                      </span>

                      {index === 2 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700">
                          <Sparkles size={12} />
                          AI Assisted
                        </span>
                      )}

                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {step.description}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">

                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-2 text-xs text-slate-600"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-[#13AA52]"
                          />
                          {detail}
                        </div>
                      ))}

                    </div>
                  </div>

                </div>

                {/* Connector Arrow */}
                {index !== steps.length - 1 && (
                  <div className="ml-5 flex h-9 items-center text-emerald-500 sm:ml-5">
                    <ArrowDown size={19} />
                  </div>
                )}

              </div>
            ))}

          </div>
        </section>

        {/* Bottom Section */}
        <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-9 text-center sm:px-10">

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#00684A]">
            <Database size={23} />
          </div>

          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            That's how SmartSeed works!
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Your existing schemas provide the structure.
            SmartSeed handles the analysis, generator selection,
            and synthetic data creation.
          </p>

        </section>

      </div>
    </main>
  );
}