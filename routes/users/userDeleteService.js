export default function userDeleteService(app, sql) {
  app.post("/users/delete-service", async (req, res) => {
    try {
      const { email, testid } = req.body;

      if (!email || !testid) {
        return res.status(400).send("❌ Email");
      }

      // достаём пользователя
      const [user] = await sql`
        SELECT limitcreate, services
        FROM users
        WHERE email = ${email}
      `;

      if (!user) {
        return res.status(404).send("❌ None");
      }

      // фильтруем services (удаляем по testid)
      const updatedServices = user.services.filter(
        (service) => service.testid !== testid
      );

      if (updatedServices.length === user.services.length) {
        return res.status(404).send("❌ deleted");
      }

      // обновляем в базе
      await sql`
        UPDATE users
        SET services = ${JSON.stringify(updatedServices)}::jsonb,
            limitcreate = limitcreate + 1
        WHERE email = ${email}
      `;

      res.send("✅ Тест удалён, лимит увеличен");
    } catch (err) {
      console.error("❌ Ошибка :", err);
      res.status(500).send("Error smth with you");
    }
  });
}
