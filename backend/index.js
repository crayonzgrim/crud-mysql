import cors from "cors";
import express from "express";
import * as mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "voxmflr0302",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello ");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  // const value = ["title from BE", "desc from BE", "cover pic from BE"];
  const value = [req.body.title, req.body.desc, req.body.price, req.body.cover];

  db.query(q, [value], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created!!");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated!!");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted!!");
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
