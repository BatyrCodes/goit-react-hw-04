import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const ACCESS_KEY = "oo4GBvrJ_n0rSB0dgqDcMs7zPwmy9t9EFWxgljbjqfE";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (searchQuery, page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            page,
            per_page: 12,
            client_id: ACCESS_KEY,
          },
        }
      );
      setImages((prev) =>
        page === 1 ? response.data.results : [...prev, ...response.data.results]
      );
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Search field cannot be empty!");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (image) => {
    if (modalImage && modalImage.id === image.id) {
      setModalImage(null);
    } else {
      setModalImage(image);
    }
  };

  return (
    <div>
      <ToastContainer />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} />
      )}
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
};

export default App;
