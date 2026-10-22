function formatBytes(bytes) {
  if (!bytes) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

export default function UploadList({ uploads = [] }) {
  return (
    <section className="uploads-section">
      <div className="section-heading">
        <h2>Recent Uploads</h2>
        <span>
          {uploads.length} upload{uploads.length === 1 ? "" : "s"}
        </span>
      </div>

      {uploads.length === 0 ? (
        <div className="empty-state">
          No uploads yet. Your uploaded files will appear here.
        </div>
      ) : (
        <div className="upload-list">
          {uploads.map((upload, index) => (
            <article className="upload-item" key={upload._id || index}>
              <div>
                <h3>{upload.title}</h3>

                <p>
                  {upload.createdAt
                    ? new Date(upload.createdAt).toLocaleString()
                    : "Date unavailable"}
                  {" · "}
                  {(upload.files || []).length} file(s)
                </p>

                <div className="file-links">
                  {(upload.files || []).map((file, fileIndex) => (
                    <div key={file._id || fileIndex}>
                      <span>
                        {file.originalName || file.name || "Untitled file"}
                      </span>
                      {" "}
                      <span>
                        ({formatBytes(file.size)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="delete-button"
                disabled
                title="Delete functionality removed"
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
