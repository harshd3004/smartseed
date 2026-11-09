import { useRef, useState } from "react";
import {
  Upload,
  FileCode2,
  File,
  X,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import ProgressBar from "./ProgressBar.jsx";
import { uploadModels } from "../api/schemaApi.js";

export default function UploadForm({ onUploaded }) {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Ready to upload");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const chooseFiles = (event) => {
    const selected = Array.from(event.target.files || []);

    setFiles(selected);
    setError("");
    setProgress(0);
    setStatus(
      selected.length
        ? `${selected.length} file(s) selected`
        : "Ready to upload"
    );
  };

  const submit = async () => {
    if (!files.length) {
      return setError("Please choose at least one file.");
    }

    setBusy(true);
    setError("");
    setProgress(0);
    setStatus("Uploading files...");

    try {
      const result = await uploadModels(files);

      setProgress(100);
      setStatus("Upload completed successfully");
      setFiles([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      onUploaded?.(result);
    } catch (err) {
      setStatus("Upload failed");
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#00684A]">
          <Upload size={22} />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Upload Mongoose Models
        </h2>

        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          Upload your Mongoose model files to let SmartSeed analyze
          your schemas and prepare a generation plan.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        multiple
        accept=".js"
        onChange={chooseFiles}
      />

      {/* Upload Area */}
      <div
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 px-5 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#00684A]">
          <FolderOpen size={27} />
        </div>

        <h3 className="text-sm font-semibold text-slate-800">
          {files.length
            ? `${files.length} file(s) selected`
            : "Select your model files"}
        </h3>

        <p className="mt-2 text-xs text-slate-500">
          Choose JavaScript (.js) Mongoose model files
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#13AA52] bg-white px-4 py-2.5 text-sm font-semibold text-[#00684A] transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload size={16} />
          {files.length ? "Change Files" : "Browse Files"}
        </button>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Selected Files
            </h3>

            <span className="text-xs text-slate-400">
              {files.length} files
            </span>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00684A]">
                  <FileCode2 size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <File size={16} className="shrink-0 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={submit}
        disabled={busy || !files.length}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#13AA52] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E9145] focus:outline-none focus:ring-2 focus:ring-[#13AA52] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <Upload size={17} />
        {busy ? "Uploading..." : "Start Upload"}
      </button>

      {/* Upload Progress */}
      <div className="mt-5">
        <ProgressBar progress={progress} status={status} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Success Message */}
      {!error && progress === 100 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 size={17} />
          Models uploaded successfully!
        </div>
      )}

      {/* Footer */}
      <p className="mt-5 text-center text-xs text-slate-400">
        Only upload trusted Mongoose model files.
      </p>
    </section>
  );
}