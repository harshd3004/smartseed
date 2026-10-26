import UploadForm from '../components/UploadForm.jsx';

export default function Home({ uploads, onUploaded, onDeleted }) {
  return (
    <main className="page home-page">
      <div className="hero-copy">
        <p className="eyebrow">SmartSeed - Fake Data Generation</p>
        <h1>Upload your JS files</h1>
        <p className="subtitle">Upload your Schema Model files.</p>
      </div>
      <UploadForm onUploaded={onUploaded} />
    </main>
  );
}
