export default function usersCheck(app, sql) {
  // Проверка, есть ли пользователь в базе по email
  app.get("/users/:email", async (req, res) => {
    try {
      const { email } = req.params;

      const rows = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1;
      `;

      if (rows.length === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      res.json(rows[0]); // отдаём всю инфу по юзеру
    } catch (err) {
      console.error("Ошибка при поиске пользователя:", err);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
}
