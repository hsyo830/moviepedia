import placeholderImage from "../assets/placeholder.png";

function FileInput({ name }) {
  return (
    <>
      <input name={name} type="file" />
      <img src={placeholderImage} />
    </>
  );
}

export default FileInput;
