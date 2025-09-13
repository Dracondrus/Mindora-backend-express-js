import express from "express";
import cors from "cors";
import path from "path";
import { neon } from "@neondatabase/serverless";

import initDbRoute from "./routes/initdb/initdb.js";
import usersCheckNew from "./routes/users/usersCheckNew.js"; 
import usersCheck from "./routes/users/usersCheck.js";

const app = express();
const PORT = 7777;

app.use(cors());
app.use(express.json());


const sql = neon("postgresql://neondb_owner:npg_6qYOi3rhkojp@ep-hidden-night-af7s26er-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

initDbRoute(app, sql);
usersCheckNew(app, sql);
usersCheck(app, sql);

// Указываем папку со статическими файлами
app.use(express.static('public'));

// Обработка главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает: http://localhost:${PORT}`);
});
