export default function initDbRoute(app, sql) {
  app.get("/init", async (req, res) => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          image TEXT,
          nickname TEXT NOT NULL,
          firstname TEXT,
          email TEXT UNIQUE NOT NULL,
          quantity_online_create_service INT DEFAULT 0,
          quantity_private_create_service INT DEFAULT 0,
          quantity_public_create_service INT DEFAULT 0,
          quantity_local_create_service INT DEFAULT 0,
          services JSONB DEFAULT '[]'
        )
      `;
      res.send("✅ Таблица users готова!");
    } catch (err) {
      console.error(err);
      res.status(500).send("❌ Ошибка при инициализации БД");
    }
  });
}
