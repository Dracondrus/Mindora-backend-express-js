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
  firstname,
  image,
  localstorage, 
  publicstorage,
  privatestorage,
  publicservice,
  privateservice,
  privateterm,
  publicterm,
  localterm,
  limitcreate,
  services
)
VALUES (
  ${email},
  ${name || ""},    
  ${image || ""},   
  4,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  '[]'::jsonb
)
      `;

      res.send("✅ Новый пользователь создан");
    } catch  {
      console.error("❌ Ошибка в /users:");
     
    }
  });
}
