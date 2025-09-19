export default function AddTestStandart(app, sql) {
  app.post("/test/add-standart-test", async (req, res) => {
    const { email, testid, question } = req.body;

    if (!email || !testid || !question) {
      return res.status(400).send("❌ Не хватает данных");
    }

    try {
      // 1. Находим пользователя
      const [user] = await sql`
        SELECT * FROM users WHERE email = ${email}
      `;

      if (!user) {
        return res.status(404).send("❌ Пользователь не найден");
      }

      let services = user.services || [];

      // 2. Находим тест
      const testIndex = services.findIndex(s => s.testid === testid);
      if (testIndex === -1) {
        return res.status(404).send("❌ Тест не найден");
      }

      // 3. Добавляем вопрос
      services[testIndex].questions.push(question);

      // 4. Сохраняем обратно (через JSON.stringify)
      await sql`
        UPDATE users
        SET services = ${JSON.stringify(services)}::jsonb
        WHERE email = ${email}
      `;

      res.send("✅ Вопрос добавлен в тест");
    } catch (err) {
      console.error("❌ Ошибка:", err);
      res.status(500).send("❌ Ошибка при добавлении вопроса");
    }
  });
}
