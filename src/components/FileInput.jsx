import { useEffect, useState } from "react";
import placeholderImage from "../assets/placeholder.png";

function FileInput({ name, initialPreview }) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(nextFile);
  };

  useEffect(() => {
    if (!file) {
      setPreview(initialPreview);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <>
      <input name={name} type="file" onChange={handleChange} />
      <img src={preview || placeholderImage} />
    </>
  );
}

export default FileInput;
