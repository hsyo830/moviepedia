import { useState } from "react";
import ReviewList from "./components/ReviewList";
import mockData from "./mock.json";
import Modal from "./components/Modal";

function App() {
  const [items, setItem] = useState(mockData);
  const [order, setOrder] = useState("createdAt");
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);

  const sortedItem = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItem(nextItems);
  };
  return (
    <>
      <div>
        <button onClick={() => setOrder("createdAt")}>최신순</button>
        <button onClick={() => setOrder("rating")}>평점순</button>
        <button onClick={() => setIsCreateReviewOpen(true)}>추가하기</button>
        <Modal
          isOpen={isCreateReviewOpen}
          onClose={() => setIsCreateReviewOpen(false)}
        >
          생성 모달
        </Modal>
      </div>
      <ReviewList items={sortedItem} onDelete={handleDelete} />
    </>
  );
}

export default App;
