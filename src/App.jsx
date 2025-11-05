import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";
import Modal from "./components/Modal";
import ReviewForm from "./components/ReviewForm";
import Button from "./components/Button";
import Layout from "./components/Layout";
import styles from "./App.module.css";
import useTranslate from "./hooks/useTranslate";
import axios from "./utils/axios";

const LIMIT = 10;

function App() {
  const [items, setItem] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const t = useTranslate();

  const handleLoad = async (orderParams) => {
    const response = await axios.get("/film-reviews", {
      params: { order: orderParams, limit: LIMIT },
    });
    const { reviews, paging } = response.data;
    setItem(reviews);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = async () => {
    const response = await axios.get("/film-reviews", {
      params: { order, offset: items.length, limit: LIMIT },
    });
    const { reviews, paging } = response.data;
    setItem((prevItems) => [...prevItems, ...reviews]);
    setHasNext(paging.hasNext);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/film-reviews/${id}`);
    setItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCreate = async (data) => {
    const response = await axios.post("/film-reviews", data);
    const { reviews } = response.data;
    setItem((prevItems) => [reviews, ...prevItems]);
    setIsCreateReviewOpen(false);
  };

  const handleUpdate = async (id, data) => {
    const response = await axios.patch(`/film-reviews/${id}`, data);
    const { reviews } = response.data;
    setItem((prevItems) => {
      const index = items.findIndex((item) => item.id === id);
      return [
        ...prevItems.slice(0, index),
        reviews,
        ...prevItems.slice(index + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

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
        items={items}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      {hasNext && <Button onClick={handleLoadMore}>더 불러오기</Button>}
    </Layout>
  );
}

export default App;
