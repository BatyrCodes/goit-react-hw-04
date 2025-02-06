import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
