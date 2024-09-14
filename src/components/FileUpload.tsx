import { useState } from 'react';

// Adjust the import based on the actual export from `uploadthing`
import { UploadThing } from 'uploadthing'; 

interface FileUploadProps {
  onUpload: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Ensure correct usage based on package documentation
      const { url } = await UploadThing.upload(file);

      // Call the onUpload callback with the file URL
      onUpload(url);
    } catch (err) {
      setError('Error uploading file.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
