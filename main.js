import express from "express";
import cors from "cors";
import events from "events";

const emitter = new events.EventEmitter();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// клиент ждёт сообщения
app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", (message) => {
    res.json(message);
  });
});

// клиент отправляет сообщение
app.post("/new-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200).json({ ok: true });
});

// старт сервера
app.listen(PORT, () => {
  console.log(`✅ http://localhost:${PORT}`);
});
