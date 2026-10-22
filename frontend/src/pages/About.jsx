export default function About() {
  return (
    <main className="page info-page">
      <div className="info-card">
        <p className="eyebrow">ABOUT US</p>
        <h1>Simple, reliable file uploads.</h1>
        <p>This MERN stack application provides a clean portal for uploading files, tracking progress, storing metadata, and downloading previously uploaded files.</p>
        <div className="feature-grid">
          <div><strong>React</strong><span>Responsive user interface</span></div>
          <div><strong>Node + Express</strong><span>REST API and uploads</span></div>
          <div><strong>MongoDB</strong><span>Upload metadata storage</span></div>
          <div><strong>Multer</strong><span>Multipart file handling</span></div>
        </div>
      </div>
    </main>
  );
}
