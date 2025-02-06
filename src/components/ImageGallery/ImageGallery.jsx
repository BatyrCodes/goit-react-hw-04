import s from "./ImageGallery.module.css";
const ImageGallery = ({ children }) => {
  return <ul className={s.wrapper}>{children}</ul>;
};

export default ImageGallery;
