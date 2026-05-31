const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

let client;

async function connectDB() {

  try {

    client = new Client({
      host: "db",
      port: 5432,
      user: "postgres",
      password: "G0wth@m_04",
      database: "myapp"
    });

    await client.connect();

    console.log("Connected to PostgreSQL");

  } catch (err) {

    console.log("DB Connection Error:", err);

    console.log("Retrying in 5 seconds...");

    setTimeout(connectDB, 5000);

  }

}

connectDB();


app.get("/users", async (req, res) => {

  try {

    const result = await client.query(
      "SELECT * FROM users ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Database query failed"
    });

  }

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});