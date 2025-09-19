import express from "express";
import cors from "cors";
import path from "path";
import { neon } from "@neondatabase/serverless";

import initDbRoute from "./routes/initdb/initdb.js";
import usersService from "./routes/users/UsersServices.js";
import TestsService from "./routes/tests/testsService.js";


const app = express();
const PORT = 7777;
app.use(cors({
  origin: [
    "https://mindora-by-elfasa.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());


const sql = neon("postgresql://neondb_owner:npg_6qYOi3rhkojp@ep-hidden-night-af7s26er-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

initDbRoute(app, sql);
usersService(app,sql)
TestsService(app,sql)
// Указываем папку со статическими файлами
app.use(express.static('public'));

// Обработка главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает: http://localhost:${PORT}`);
});
