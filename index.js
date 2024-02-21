require("dotenv").config();
const express = require("express"); // import du package express
const cors = require("cors"); // import du package cors
const { default: axios } = require("axios");

const app = express(); // création du serveur
app.use(cors());
app.use(express.json());

const api_key = process.env.API_KEY;
const api_url_characters = process.env.API_URL_CHARACTERS;

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API Marvel");
});

// Récupérer la liste des personnages
app.get("/characters", async (req, res) => {
  try {
    const { skip = 0 } = req.query;

    const response = await axios.get(
      `${api_url_characters}?apiKey=${api_key}&skip=${skip}`
    );
    const characters = response.data.results;
    res.json(characters);
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des personnages.",
    });
  }
});

// Récupérer un personnage
app.get("/character/:characterId", async (req, res) => {
  const characterId = req.params.characterId;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?skip=2?apiKey=${api_key}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du personnage",
    });
  }
});

// Récupérer la listes des comics
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/?apiKey=${api_key}`
    );
    const comics = response.data.results;
    res.json(comics);
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des bandes dessinées",
    });
  }
});

// Récupérer un comic
app.get("/comic/:comicId", async (req, res) => {
  const comicID = req.params.comicId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicID}?apiKey=${api_key}`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la bande dessinée",
    });
  }
});

// Gestion de toutes les autres routes
app.all("*", function (req, res) {
  res.json({ message: "Page not found..." });
});

// Démarrage du serveur
app.listen(process.env.PORT || 3200, () => {
  console.log("Server started...");
});
