import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageCard from "./components/ImageCard/ImageCard";
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
      console.log("Response:", response.data);
      setImages((prev) =>
        page === 1 ? response.data.results : [...prev, ...response.data.results]
      );
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError(err.response?.data?.errors?.[0] || "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => setModalImage(image)}
          />
        ))}
      </ImageGallery>
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
