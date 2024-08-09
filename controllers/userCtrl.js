const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, client) => {
  try {
    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Création d'un nouveau utilisateur
    const query = {
      text: "INSERT INTO users(first_name, last_name, sexe, location, birthdate, email, password, phone, role_fk) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )",
      values: [
        req.body.first_name,
        req.body.last_name,
        req.body.sexe,
        req.body.location,
        req.body.birthdate,
        req.body.email,
        hashedPassword,
        req.body.phone,
        req.body.role_fk,
      ],
    };

    await client.query(query);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Error inserting user" });
  }
};

exports.login = async (req, res, client) => {
  try {
    const { email, password } = req.body;

    // Rechercher l'utilisateur par nom d'utilisateur
    const query = {
      text: "SELECT * FROM users u JOIN roles r ON u.role_fk = r.id WHERE email = $1 AND r.name = 'admin'",
      values: [email],
    };

    const result = await client.query(query);

    if (result.rows.length === 0) {
      // Si l'utilisateur n'est pas trouvé
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    // Comparer le mot de passe fourni avec le mot de passe haché en base de données
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      // Si le mot de passe n'est pas valide
      return res.status(401).json({ error: "Invalid password" });
    }
    // Si l'utilisateur est trouvé et le mot de passe est correct
    res.status(200).json({ 
      token: jwt.sign(
        { userId: user.id },
        process.env.TOKEN_KEY,
        { expiresIn: '1h' }
    )
    })
    } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.tokenCheck = async (req, res, client) => {
  try {

    // Rechercher l'utilisateur par nom d'utilisateur
    const query = {
      text: "SELECT u.first_name, u.last_name, u.sexe, u.email, u.phone, r.name FROM users u JOIN roles r ON u.role_fk = r.id WHERE u.id = $1 AND r.name = 'admin'",
      values: [req.auth.userId],
    };

    const result = await client.query(query);
    const user = result.rows
    
    if (user.length === 0) {
      // Si l'utilisateur n'est pas trouvé
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({user });
    } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res, client) => {
  try {
    // Récupérer ls informations sur tous les utilisateurs
    const query = { text: "SELECT u.id, u.first_name, u.last_name, u.sexe, u.location, u.birthdate, u.email, u.phone, r.name AS role_name FROM users u JOIN roles r ON u.role_fk = r.id;" };
    const response = await client.query(query);
    const users = response.rows
    res.status(200).json({users });
  } catch (error) {
    console.error("Error get all users :", error);
    res.status(500).json({ error: "Error get all users" });
  }
};