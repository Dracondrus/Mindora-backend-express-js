export default function initDbRoute(app, sql) {
  app.get("/init", async (req, res) => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          image TEXT,
          firstname TEXT,
          email TEXT UNIQUE NOT NULL,

          localstorage INT DEFAULT 0,
          publicstorage INT DEFAULT 0,
          privatestorage INT DEFAULT 0,

          publicservice INT DEFAULT 0,
          privateservice INT DEFAULT 0,

          privateterm INT DEFAULT 0,
          publicterm INT DEFAULT 0,
          localterm INT DEFAULT 0,
         
          limitcreate INT DEFAULT 0,
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
