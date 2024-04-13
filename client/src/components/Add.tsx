import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/books", book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <h1>Add new book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
