import useAuthLogic from "./useUploadLogic";
import "../Auth/style.css"

const Upload = () => {
  const { form, setForm, handleUpload, message } = useAuthLogic();

  return (
    <>
      <header className="welcome-header">
        <h1>Upload</h1>
        <p>Upload whatever you like</p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <div className="welcome-form">
            <label>Tag</label>
            <input
              type="tag"
              placeholder="beach"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            />

            <label>Description</label>
            <input 
              type="description" 
              placeholder="Sunny picture" 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
             
            <label>Description</label>
            <input 
              type="file"
              onChange={(e) => setForm({ ...form, file: e.target.files[0]})}
            />          
                      
            
            <div>          
                <div className={`message-container ${message.color}`}>{message.message}</div>
                <button className="welcome-button" onClick={() => { handleUpload(form.tag,form.description,form.file) }}>Upload</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Upload;