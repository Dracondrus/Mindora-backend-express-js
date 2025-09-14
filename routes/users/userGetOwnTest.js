export default function userGetOwnTest(app, sql) {
  app.post("/users/get-own-test", async (req, res) => {
    try {
      const { email, testid } = req.body;

      if (!email || !testid) {
        return res.status(400).send("❌ Email и testid обязательны");
      }

      // достаём пользователя
      const [user] = await sql`
        SELECT services
        FROM users
        WHERE email = ${email}
      `;

      if (!user) {
        return res.status(404).send("❌ Пользователь не найден");
      }

      // ищем тест по testid
      const test = user.services.find(service => service.testid === testid);

      if (!test) {
        return res.status(404).send("❌ Тест не найден");
      }

      res.json(test); // возвращаем найденный тест
    } catch (err) {
      console.error("❌ Ошибка в /users/get-service:", err);
      res.status(500).send("Ошибка сервера");
    }
  });
}
