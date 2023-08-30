require("dotenv").config();
const express = require("express"); // import du package express
const cors = require("cors"); // import du package cors
const { default: axios } = require("axios");

const app = express(); // création du serveur
app.use(cors());

// const api_url = process.env.API_URL;
const api_key = process.env.API_KEY;

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Marvel" });
});

// Récupérer la liste des personnages
app.get("/personnages", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${api_key}`
    );
    const personnages = response.data.results;
    res.json(personnages);
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des personnages",
    });
  }
});

// Gestion de toutes les autres routes (page non trouvée)
app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

// Démarrage du serveur
app.listen(process.env.PORT || 3200, () => {
  console.log("Server started...");
});
