import { useEffect, useRef, useState } from "react";
import placeholderImage from "../assets/placeholder.png";

function FileInput({ name, initialPreview }) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(nextFile);
  };

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
      <input name={name} type="file" onChange={handleChange} ref={inputRef} />
      <img src={preview || placeholderImage} />
      {file && (
        <button type="button" onClick={handleClear}>
          X
        </button>
      )}
    </>
  );
}

export default FileInput;
