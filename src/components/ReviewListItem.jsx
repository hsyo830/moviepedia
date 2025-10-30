import styles from "./ReviewListItem.module.css";

function ReviewListItem({ item, onDelete }) {
  const dateString = new Date(item.createdAt).toLocaleDateString();

  return (
    <div className={styles.item}>
      <img className={styles.image} src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{dateString}</p>
        <p>{item.content}</p>
        <button onClick={() => onDelete(item.id)}>삭제</button>
      </div>
    </div>
  );
}

export default ReviewListItem;
