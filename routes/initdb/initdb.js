export default function initDbRoute(app, sql) {
  app.get("/init", async (req, res) => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          image TEXT,
          
          firstname TEXT,
          email TEXT UNIQUE NOT NULL,
          quantityonlinecreateservice INT DEFAULT 0,
          quantityprivatecreateservice INT DEFAULT 0,
          quantitypubliccreateservice INT DEFAULT 0,
          quantitylocalcreateservice INT DEFAULT 0,
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
