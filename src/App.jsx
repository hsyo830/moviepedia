import { useState } from "react";
import ReviewList from "./components/ReviewList";
import mockData from "./mock.json";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm";

function App() {
  const [items, setItem] = useState(mockData);
  const [order, setOrder] = useState("createdAt");
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);

  const sortedItem = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItem(nextItems);
  };

  const handleCreate = (data) => {
    const now = new Date();
    const newItem = {
      id: items.length + 1,
      ...data,
      createdAt: now.valueOf(),
      updatedAt: now.valueOf(),
    };
    setItem([newItem, ...items]);
    setIsCreateReviewOpen(false);
  };

  const handleUpdate = (id, data) => {
    const index = items.findIndex((item) => item.id === id);
    const now = new Date();
    const newItem = {
      ...items[index],
      ...data,
      updatedAt: now.valueOf(),
    };
    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
    ];
    setItem(newItems);
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
          <h2>리뷰 생성</h2>
          <ReviewForm onSubmit={handleCreate} />
        </Modal>
      </div>
      <ReviewList
        items={sortedItem}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
