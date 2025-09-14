export default function userAddNewService(app, sql) {
  app.post("/users/add-service", async (req, res) => {
    try {
      const { title, testid, email, status, expire, questions } = req.body;

      if (!email) {
        return res.status(400).send("❌ Email обязателен");
      }

      // достаём пользователя
      const [user] = await sql`
        SELECT limitcreate, services
        FROM users
        WHERE email = ${email}
      `;

      if (!user) {
        return res.status(404).send("❌ Пользователь не найден");
      }

      if (user.limitcreate <= 0) {
        return res.status(400).send("❌ Лимит создания тестов исчерпан");
      }

      // новый тест
      const newTest = {
        testid,     // уникальный идентификатор теста
        title,
        email,
        status,
        expire,
        questions
      };

      // обновляем services
      const updatedServices = [...user.services, newTest];

      // уменьшаем лимит и сохраняем
      await sql`
        UPDATE users
        SET services = ${JSON.stringify(updatedServices)}::jsonb,
            limitcreate = limitcreate - 1
        WHERE email = ${email}
      `;

      res.send("✅ created");
    } catch (err) {
      console.error("❌ Ошибка в /users/add-service:", err);
      res.status(500).send("Ошибка сервера");
    }
  });
}
