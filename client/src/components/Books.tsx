import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  desc: string;
  cover: string;
  price: number;
};

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      // window.location.reload()
      fetchAllBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (book: Book) => {
    console.log(book);
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1>BOOK SHOP</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <p>{book.cover}</p>}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price} </span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              DELETE
            </button>
            <button className="update" onClick={() => handleUpdate(book)}>
              <Link to={`/update/${book.id}`}>UPDATE</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={"/add"}>Add new book</Link>
      </button>
    </div>
  );
};
