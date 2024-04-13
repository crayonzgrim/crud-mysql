import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/books/${params.id}`, book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <h1>UPDATE new book</h1>
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

      <button onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};
