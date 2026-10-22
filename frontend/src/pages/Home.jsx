import UploadForm from '../components/UploadForm.jsx';
import UploadList from '../components/UploadList.jsx';

export default function Home({ uploads, onUploaded, onDeleted }) {
  return (
    <main className="page home-page">
      <div className="hero-copy">
        <p className="eyebrow">FILE MANAGEMENT PORTAL</p>
        <h1>Upload your files</h1>
        <p className="subtitle">Add a title, choose one or more files, and track the upload status in real time.</p>
      </div>
      <UploadForm onUploaded={onUploaded} />
      <UploadList uploads={uploads} onDeleted={onDeleted} />
    </main>
  );
}
