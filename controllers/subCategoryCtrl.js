exports.newSubCategory = async (req, res, client) => {
  try {
    // Inserer une nouvelle sous-catégorie
    const query = {
      text: "INSERT INTO subcategories (name) VALUES ($1)",
      values: [req.body.name],
    };

    await client.query(query);
    res.status(201).json({ message: "Subcategories created successfully" });
  } catch (error) {
    console.error("Error insert new subcategories :", error);
    res.status(500).json({ error: "Error inserting subcategories" });
  }
};

exports.deleteSubCategory = async (req, res, client) => {
    try {
    // Supprimer une couleur
    const query = {
        text: "DELETE FROM subcategories WHERE name = $1",
        values: [req.body.name],
    };
  
      await client.query(query);
      res.status(201).json({ message: "Subcategories deleted successfully" });
    } catch (error) {
      console.error(`Error deleted subcategories (${req.body.name}) :`, error);
      res.status(500).json({ error: `Error deleted subcategories ${req.body.name}` });
    }
};

exports.getAllSubCategory = async (req, res, client) => {
    try {
      // Récupérer toutes les sous-catégorie
      const query = { text: "SELECT * FROM subcategories" };
  
      const response = await client.query(query);
      const subCategories = response.rows
      res.status(200).json({subCategories });
    } catch (error) {
      console.error("Error get all subcategories :", error);
      res.status(500).json({ error: "Error get all subcategories" });
    }
  };