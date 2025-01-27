const User = require('../models/user');

module.exports = {
  getProfile,
  updateProfile,
};

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating profile' });
  }
}
