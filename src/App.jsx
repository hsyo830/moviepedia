import { useState } from "react";
import ReviewList from "./components/ReviewList";
import mockData from "./mock.json";

function App() {
  const [items, setItem] = useState(mockData);
  const [order, setOrder] = useState("createdAt");

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
      </div>
      <ReviewList items={sortedItem} onDelete={handleDelete} />
    </>
  );
}

export default App;
