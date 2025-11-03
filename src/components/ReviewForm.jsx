import { useEffect, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import placeholderImage from "../assets/placeholder.png";
import styles from "./ReviewForm.module.css";

function ReviewForm({
  review = {
    title: "",
    imgUrl: "",
    rating: 1,
    content: "",
  },
  onSubmit,
}) {
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
    <form className={styles.form} action={submit}>
      <img src={placeholderImage} />
      <div className={styles.content}>
        <div className={styles.titleRating}>
          <Input
            className={styles.title}
            name="title"
            placeholder="제목을 입력하세요."
            ref={inputRef}
            defaultValue={review.title}
          />
          <Select name="rating" defaultValue={review.rating}>
            <option value={1}>★</option>
            <option value={2}>★★</option>
            <option value={3}>★★★</option>
            <option value={4}>★★★★</option>
            <option value={5}>★★★★★</option>
          </Select>
        </div>
        <Textarea
          className={styles.textarea}
          name="content"
          placeholder="내용을 입력하세요."
          defaultValue={review.content}
        />
        <Button className={styles.button}>작성완료</Button>
      </div>
    </form>
  );
}

export default ReviewForm;
