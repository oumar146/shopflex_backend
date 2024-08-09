exports.newColor = async (req, res, client) => {
  try {
    // Inserer une nouvelle couleur
    const query = {
      text: "INSERT INTO colors (name) VALUES ($1)",
      values: [req.body.name],
    };

    await client.query(query);
    res.status(201).json({ message: "Color created successfully" });
  } catch (error) {
    console.error("Error insert new color :", error);
    res.status(500).json({ error: "Error inserting color" });
  }
};

exports.deleteColor = async (req, res, client) => {
    try {
    // Supprimer une couleur
    const query = {
        text: "DELETE FROM colors WHERE name = $1",
        values: [req.body.name],
    };
  
      await client.query(query);
      res.status(201).json({ message: "Color deleted successfully" });
    } catch (error) {
      console.error(`Error deleted the ${req.body.name} :`, error);
      res.status(500).json({ error: `Error deleted the ${req.body.name}` });
    }
};

exports.getAllColors = async (req, res, client) => {
    try {
      // Récupérer toutes les couleurs
      const query = { text: "SELECT * FROM colors" };
  
      const response = await client.query(query);
      const colors = response.rows
      res.status(201).json({colors });
    } catch (error) {
      console.error("Error get all color :", error);
      res.status(500).json({ error: "Error get color" });
    }
  };