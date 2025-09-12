export default function usersRoute(app, sql) {
  app.post("/users", async (req, res) => {
    try {
      const { email, name, image } = req.body;

      if (!email) {
        return res.status(400).send("❌ Email обязателен");
      }

      // Проверяем, есть ли уже такой пользователь
      const existing = await sql`
        SELECT 1 FROM users WHERE email = ${email}
      `;

      if (existing.length > 0) {
        return res.send("✅ Пользователь уже существует");
      }

      // Создаём нового пользователя с дефолтами
      await sql`
        INSERT INTO users (
          email,
          nickname,
          firstname,
          image,
          quantityonlinecreateservice,
          quantityprivatecreateservice,
          quantitypubliccreateservice,
          quantitylocalcreateservice,
          services
        )
        VALUES (
          ${email},
          '',               -- nickname
          ${name || ""},    -- firstname
          ${image || ""},   -- image
          1,
          1,
          1,
          3,
          '[]'::jsonb       -- services
        )
      `;

      res.send("✅ Новый пользователь создан");
    } catch  {
      console.error("❌ Ошибка в /users:", err);
     
    }
  });
}
