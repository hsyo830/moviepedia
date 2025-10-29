import ReviewListItem from "./ReviewListItem";

function ReviewList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
