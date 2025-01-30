const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  signUp,
  login,
};

async function login(req, res) {
  try {
    console.log('Login request body:', req.body); // Log request data
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: 'Unauthorized - User not found' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ message: 'Unauthorized - Password incorrect' });

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    console.log('Generated Token:', token); // Debugging token creation
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err); // Log any errors
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function signUp(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/*--- Help Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
