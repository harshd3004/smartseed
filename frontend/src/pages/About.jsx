import {
  Sparkles,
  Database,
  BrainCircuit,
  Code2,
  ShieldCheck,
  Zap,
  Target,
  Layers3,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <BrainCircuit size={22} />,
      title: "AI-Assisted Generation",
      description:
        "Uses AI to understand field meanings and suggest suitable data generators for your schemas.",
    },
    {
      icon: <Database size={22} />,
      title: "Schema-Aware Data",
      description:
        "Generates data based on your existing Mongoose models, field types, and defined constraints.",
    },
    {
      icon: <Code2 size={22} />,
      title: "Developer Friendly",
      description:
        "Works with your existing Mongoose model definitions, reducing the need to manually create test records.",
    },
    {
      icon: <Zap size={22} />,
      title: "Faster Development",
      description:
        "Create large sets of synthetic records quickly instead of spending time writing repetitive seed scripts.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F8FAF9] px-4 py-12 sm:px-6 lg:py-16">

      <div className="mx-auto max-w-6xl">

        {/* Hero Section */}
        <section className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#00684A]">
            <Sparkles size={14} />
            ABOUT SMARTSEED
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Make Test Data Generation
            <span className="mt-2 block text-[#13AA52]">
              Smarter and Simpler.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            SmartSeed is an AI-assisted synthetic data generation platform
            designed for developers working with MongoDB and Mongoose.
            It transforms your existing schemas into meaningful,
            structured synthetic datasets with minimal manual effort.
          </p>

        </section>

        {/* Mission Section */}
        <section className="mb-16 grid items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">

          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#00684A]">
              <Target size={23} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#00834A]">
              Our Purpose
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Less manual work.
              <span className="block text-[#13AA52]">
                More meaningful data.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Developers often need large amounts of test data to develop,
              test, and demonstrate their applications. Creating these
              records manually or writing custom seed scripts can become
              repetitive and time-consuming.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              SmartSeed aims to simplify this process by analyzing
              Mongoose schemas, intelligently mapping fields to suitable
              generators, and creating synthetic records that follow
              the structure of your models.
            </p>
          </div>

          {/* Visual Highlight */}
          <div className="relative overflow-hidden rounded-xl bg-[#F0F8F3] p-6 sm:p-8">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00684A] text-white">
                <Layers3 size={21} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Schema to Synthetic Data
                </p>
                <p className="text-xs text-slate-500">
                  A simpler development workflow
                </p>
              </div>
            </div>

            <div className="space-y-3">

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  YOUR MONGOOSE SCHEMA
                </p>
                <div className="space-y-2 font-mono text-xs text-slate-700">
                  <p>name: String</p>
                  <p>email: String</p>
                  <p>age: Number</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-full bg-emerald-100 p-2 text-[#00684A]">
                  <BrainCircuit size={19} />
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold text-[#00684A]">
                  SYNTHETIC RECORDS
                </p>
                <div className="space-y-2 font-mono text-xs text-slate-600">
                  <p>name: "Alex Morgan"</p>
                  <p>email: "alex@example.com"</p>
                  <p>age: 28</p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <ShieldCheck size={14} />
                  Generated sample data
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* Features Section */}
        <section className="mb-16">

          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#00834A]">
              What We Offer
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Built to simplify data generation
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              SmartSeed combines schema awareness and intelligent
              generator selection to make synthetic data creation easier.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
                  {feature.icon}
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* Closing Section */}
        <section className="rounded-2xl bg-[#00684A] px-6 py-10 text-center sm:px-10 sm:py-12">

          <Sparkles className="mx-auto mb-4 text-emerald-300" size={28} />

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Focus on building. Let SmartSeed handle the data.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-100">
            Spend less time preparing test records and more time
            developing, testing, and improving your applications.
          </p>

        </section>

      </div>
    </main>
  );
}
