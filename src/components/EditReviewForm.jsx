import { useEffect, useRef } from "react";

function EditReviewForm({ review, onSubmit }) {
  const inputRef = useRef(null);

  const submit = (FormData) => {
    const data = Object.fromEntries(FormData.entries());
    onSubmit(data);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form action={submit}>
      <input
        name="title"
        placeholder="제목을 입력하세요."
        ref={inputRef}
        defaultValue={review.title}
      />
      <select name="rating" defaultValue={review.rating}>
        <option value={1}>★</option>
        <option value={2}>★★</option>
        <option value={3}>★★★</option>
        <option value={4}>★★★★</option>
        <option value={5}>★★★★★</option>
      </select>
      <textarea
        name="content"
        placeholder="내용을 입력하세요."
        defaultValue={review.content}
      />
      <button>작성완료</button>
    </form>
  );
}

export default EditReviewForm;
