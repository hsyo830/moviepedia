import { useState } from "react";
import Modal from "./Modal";
import ReviewForm from "./ReviewForm";
import Button from "./Button";
import placeholderImage from "../assets/placeholder.png";
import formatDate from "../utils/formatDate";
import styles from "./ReviewListItem.module.css";
import useTranslate from "../hooks/useTranslate";

const STARS = "★★★★★";

function ReviewListItem({ item, onUpdate, onDelete }) {
  const t = useTranslate();

  const [isEditModalOpen, setIsEditModalOpen] = useState();

  const handleEditFormSubmit = (data) => {
    onUpdate(item.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.reviewListItem}>
      <img
        className={styles.image}
        src={item.imgUrl ?? placeholderImage}
        alt={item.title}
      />
      <div className={styles.rows}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.rating}>{STARS.slice(0, item.rating)}</p>
        <p className={styles.date}>{formatDate(item.createdAt)}</p>
        <p className={styles.content}>{item.content}</p>
        <div>
          <Button
            className={styles.button}
            variant="ghost"
            onClick={() => setIsEditModalOpen(true)}
          >
            {t("edit button")}
          </Button>
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <h2 className={styles.modalTitle}>{t("edit review title")}</h2>
            <ReviewForm review={item} onSubmit={handleEditFormSubmit} />
          </Modal>
          <Button
            className={styles.button}
            variant="danger"
            onClick={() => onDelete(item.id)}
          >
            {t("delete button")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;
