import { useState } from "react";
import Modal from "./Modal";
import styles from "./ReviewListItem.module.css";
import ReviewForm from "./ReviewForm";

function ReviewListItem({ item, onUpdate, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState();
  const dateString = new Date(item.createdAt).toLocaleDateString();

  const handleEditFormSubmit = (data) => {
    onUpdate(item.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.item}>
      <img className={styles.image} src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{dateString}</p>
        <p>{item.content}</p>
        <button onClick={() => setIsEditModalOpen(true)}>수정</button>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ReviewForm review={item} onSubmit={handleEditFormSubmit} />
        </Modal>
        <button onClick={() => onDelete(item.id)}>삭제</button>
      </div>
    </div>
  );
}

export default ReviewListItem;
