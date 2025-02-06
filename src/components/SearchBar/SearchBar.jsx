import { useState } from "react";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={s.input}
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
