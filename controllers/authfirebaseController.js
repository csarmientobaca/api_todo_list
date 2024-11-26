const admin = require("../firebase");
const User = require("../models/userModel");
const axios = require("axios");

exports.registerUser = async (req, res) => {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
        });

        const newUser = new User({
            firebaseUid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL || null,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        const { idToken, localId, displayName, photoUrl } = response.data;

        let user = await User.findOne({ firebaseUid: localId });

        if (!user) {
            user = new User({
                firebaseUid: localId,
                email,
                displayName,
                photoURL: photoUrl,
            });

            await user.save();
        }

        res.status(200).json({ message: "Login successful", idToken, user });
    } catch (error) {
        console.error("Error logging in user:", error.response?.data || error.message);
        res.status(401).json({ error: "Invalid email or password" });
    }
};
