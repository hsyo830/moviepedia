import { useState } from "react";
import ReviewList from "./components/ReviewList";
import mockData from "./mock.json";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm";
import Button from "./components/Button";
import Layout from "./components/Layout";
import styles from "./App.module.css";
import useTranslate from "./hooks/useTranslate";

function App() {
  const [items, setItem] = useState(mockData);
  const [order, setOrder] = useState("createdAt");
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const t = useTranslate();
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
    <Layout>
      <div className={styles.buttons}>
        <div>
          <Button
            variant={order === "createdAt" ? "primary" : "ghost"}
            onClick={() => setOrder("createdAt")}
          >
            {t("sort by latest")}
          </Button>
          <Button
            variant={order === "rating" ? "primary" : "ghost"}
            onClick={() => setOrder("rating")}
          >
            {t("sort by best")}
          </Button>
        </div>
        <Button onClick={() => setIsCreateReviewOpen(true)}>
          {t("create button")}
        </Button>
        <Modal
          isOpen={isCreateReviewOpen}
          onClose={() => setIsCreateReviewOpen(false)}
        >
          <h2>{t("create review title")}</h2>
          <ReviewForm onSubmit={handleCreate} />
        </Modal>
      </div>
      <ReviewList
        items={sortedItem}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;
