export default function ProgressBar({ progress, status }) {
  return (
    <div className="progress-section" aria-live="polite">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">
        <span>{status}</span>
        <strong>{progress}%</strong>
      </div>
    </div>
  );
}
