import { useRef, useState, useEffect } from "react";
import { useSession } from "../context/SessionContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileCode2,
  File,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Clock,
} from "lucide-react";

import { uploadModels, extractSchema } from "../api/schemaApi.js";

export default function UploadForm() {
  const { setSessionId } = useSession();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [countdown, setCountdown] = useState(null);


  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      navigate("/schema");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const chooseFiles = (event) => {
    const selected = Array.from(event.target.files || []);

    setFiles(selected);
    setMessage({ type: "", text: "" });
    setCountdown(null);
  };

  const submit = async () => {
    if (!files.length) {
      setMessage({
        type: "error",
        text: "Please choose at least one file.",
      });
      return;
    }

    setBusy(true);
    setMessage({ type: "processing", text: "Uploading your model files..." });

    try {
      // Step 1: Upload files
      const result = await uploadModels(files);

      if (!result.success) {
        throw new Error(result.message || "File upload failed.");
      }
      setSessionId(result.sessionId);

      setMessage({
        type: "success",
        text: "Files uploaded successfully!",
      });

      // Step 2: Extract schema
      setMessage({
        type: "processing",
        text: "Analyzing models and extracting schemas...",
      });

      const schemaResult = await extractSchema(result.sessionId);


      if (!schemaResult.success) {
        throw new Error(
          schemaResult.message || "Invalid models or schema extraction failed."
        );
      }

      setMessage({
        type: "success",
        text: "Schema extracted successfully!",
      });

      // Reset selected files
      setFiles([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // Step 3: Redirect countdown
      setCountdown(3);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Something went wrong.",
      });
    } finally {
      setBusy(false);
    }
  };

  const messageStyles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-700",
    processing: "border-blue-200 bg-blue-50 text-blue-800",
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
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 px-5 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30">
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
          disabled={busy || countdown !== null}
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
        disabled={busy || !files.length || countdown !== null}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#13AA52] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E9145] focus:outline-none focus:ring-2 focus:ring-[#13AA52] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {busy ? <LoaderCircle size={17} className="animate-spin" /> : <Upload size={17} />}
        {busy ? "Processing..." : "Start Upload"}
      </button>

      {/* Status Message Section */}
      {message.text && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
            messageStyles[message.type]
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {message.type === "success" && <CheckCircle2 size={19} />}
            {message.type === "error" && <AlertCircle size={19} />}
            {message.type === "processing" && (
              <LoaderCircle size={19} className="animate-spin" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              {message.type === "success" && "Success"}
              {message.type === "error" && "Something went wrong"}
              {message.type === "processing" && "Please wait"}
            </p>

            <p className="mt-0.5 opacity-90">{message.text}</p>

            {countdown !== null && (
              <div className="mt-2 flex items-center gap-2 font-semibold">
                <Clock size={15} />
                Redirecting in {countdown}...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="mt-5 text-center text-xs text-slate-400">
        Only upload trusted Mongoose model files.
      </p>
    </section>
  );
}
