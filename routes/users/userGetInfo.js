


// routes/users/userGetInfo.js
export default function userGetInfo(app, sql) {
  app.post("/user-get-info", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).send("❌ Email обязателен");
      }

      const user = await sql`
        SELECT * FROM users WHERE email = ${email}
      `;

      if (user.length === 0) {
        return res.status(404).send("❌ Пользователь не найден");
      }

      res.json(user[0]); // возвращаем данные пользователя
    } catch (err) {
      console.error("❌ Ошибка в /user-get-info:", err);
      res.status(500).send("❌ Ошибка сервера");
    }
  });
}
