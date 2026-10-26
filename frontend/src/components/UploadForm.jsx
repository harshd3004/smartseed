import { useRef, useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import { uploadModels } from '../api/schemaApi.js';

export default function UploadForm({ onUploaded }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Ready to upload');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const chooseFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    setFiles(selected);
    setError('');
    setProgress(0);
    setStatus(selected.length ? `${selected.length} file(s) selected` : 'Ready to upload');
  };

  const submit = async () => {
    if (!files.length) return setError('Please choose at least one file.');
    setBusy(true);
    setError('');
    setProgress(0);
    setStatus('Uploading files...');
    try {
      const result = await uploadModels(files);
      setProgress(100);
      setStatus('Upload completed successfully');
      setFiles([]);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setStatus('Upload failed');
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="upload-card">


      <input ref={inputRef} className="file-input" type="file" multiple onChange={chooseFiles} />
      <button className="upload-button" onClick={() => inputRef.current?.click()} disabled={busy}>
        {files.length ? 'CHANGE FILES' : 'UPLOAD FILES'}
      </button>

      {files.length > 0 && (
        <div className="selected-files">
          {files.map((file) => <span key={`${file.name}-${file.lastModified}`}>{file.name}</span>)}
        </div>
      )}

      <button className="submit-button" onClick={submit} disabled={busy}>
        {busy ? 'UPLOADING...' : 'START UPLOAD'}
      </button>

      <ProgressBar progress={progress} status={status} />
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
