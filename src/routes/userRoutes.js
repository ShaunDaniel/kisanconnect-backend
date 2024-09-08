import express from 'express';
import User from '../models/user.js'; // Add .js extension
import bcrypt from 'bcryptjs';

const router = express.Router();

// GET /users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /users
router.post('/register', async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      console.log("Inside login");
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
            } else {
                const userResponse = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        city: user.city,
                        state: user.state,
                        profilePicture: user.profilePicture,
                        businessName: user.businessName,
                        businessAddress: user.businessAddress,
                        landArea: user.landArea,
                        farmingType: user.farmingType,
                        hasTransportService: user.hasTransportService,
                        isCertified: user.isCertified,
                        istermsAccepted: user.istermsAccepted
                    };
                res.json(userResponse);
            }
        }
    } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
    }
  })



// PUT /users/:id
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email/Phone already exists' });
        }
        res.status(400).json({ message: error.message });
    }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /check
router.post('/check', async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Email query parameter is required' });
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;