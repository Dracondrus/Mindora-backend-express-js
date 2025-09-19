export default function AddTestEdit(app, sql) {
  // ✏️ Редактировать вопросы теста
  app.post("/test/add-test-edit", async (req, res) => {
    try {
      const { email, testid, questions } = req.body

      if (!email || !testid || !questions) {
        return res.status(400).json({ error: "❌ Missing data" })
      }

      // 1. Берём пользователя
      const users = await sql`
        SELECT services FROM users WHERE email = ${email}
      `
      if (users.length === 0) {
        return res.status(404).json({ error: "❌ User not found" })
      }

      const services = users[0].services || []

      // 2. Ищем сервис по testid
      const idx = services.findIndex(s => s.testid === testid)
      if (idx === -1) {
        return res.status(404).json({ error: "❌ Test not found in services" })
      }

      // 3. Обновляем вопросы
      services[idx].questions = questions

      // 4. Сохраняем обратно
      await sql`
        UPDATE users
        SET services = ${JSON.stringify(services)}::jsonb
        WHERE email = ${email}
      `

      res.json({ success: true, services })
    } catch (err) {
      console.error("❌ Ошибка при редактировании теста:", err)
      res.status(500).json({ error: "Ошибка сервера" })
    }
  })
}
