export default function Process() {
  const steps = [
    ['01', 'Enter title', 'Give the upload a meaningful title.'],
    ['02', 'Choose files', 'Select up to 10 files from your device.'],
    ['03', 'Upload', 'Click START UPLOAD and watch the live progress bar.'],
    ['04', 'Manage', 'Download your files later or delete the upload record.']
  ];

  return (
    <main className="page info-page">
      <div className="info-card process-card">
        <p className="eyebrow">PROCESS</p>
        <h1>How it works</h1>
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <div className="step" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
