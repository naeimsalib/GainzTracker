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
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

async function signUp(req, res) {
  try {
    console.log('Signup request received:', req.body); // Debugging log

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User created:', user); // Debugging log

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Signup Error:', err); // Log exact error
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
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
