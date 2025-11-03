import { useState } from "react";
import ReviewList from "./components/ReviewList";
import mockData from "./mock.json";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm";
import LocaleContext from "./contexts/LocaleContext";
import LocaleSelect from "./components/LocaleSelect";
import Button from "./components/Button";
import Layout from "./components/Layout";
import styles from "./App.module.css";

function App() {
  const [items, setItem] = useState(mockData);
  const [order, setOrder] = useState("createdAt");
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [locale, setLocale] = useState("ko");
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
    <LocaleContext.Provider value={locale}>
      <Layout locale={locale} onLocaleChange={setLocale}>
        <div className={styles.buttons}>
          <div>
            <Button
              variant={order === "createdAt" ? "primary" : "ghost"}
              onClick={() => setOrder("createdAt")}
            >
              최신순
            </Button>
            <Button
              variant={order === "rating" ? "primary" : "ghost"}
              onClick={() => setOrder("rating")}
            >
              평점순
            </Button>
          </div>
          <Button onClick={() => setIsCreateReviewOpen(true)}>추가하기</Button>
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
      </Layout>
    </LocaleContext.Provider>
  );
}

export default App;
