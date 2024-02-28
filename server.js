const express = require("express");
const cors = require("cors"); // Для обработки CORS (если ваш фронтенд и бэкенд работают на разных доменах)

const app = express();
app.use(express.json()); // Позволяет парсить тело запроса в формате JSON
app.use(cors()); // Включаем обработку CORS

// Пример начальных данных
let items = [
  { id: 1, name: "Молоко", isBought: false, price: 2.5 },
  { id: 2, name: "Хлеб", isBought: false, price: 1.0 },
];

// Обработчик GET запроса для получения списка элементов
app.get("/items", (req, res) => {
  res.json(items);
});

// Обработчик POST запроса для добавления нового элемента
app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem); // Возвращаем статус 201 Created
});

// Обработчик PATCH запроса для изменения свойств элемента по его идентификатору
app.patch("/items/:id", (req, res) => {
  const { id } = req.params;
  const foundItem = items.find((item) => item.id === +id);

  if (!foundItem) {
    return res.status(404).json({ message: "Элемент не найден" });
  }

  Object.assign(foundItem, req.body);
  res.json(foundItem);
});

// Обработчик DELETE запроса для удаления элемента по его идентификатору
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== +id);
  res.sendStatus(204); // Возвращаем статус 204 No Content
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
