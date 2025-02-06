import s from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={s.imageCard} onClick={onClick}>
      <img
        className={s.image}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </li>
  );
};

export default ImageCard;
