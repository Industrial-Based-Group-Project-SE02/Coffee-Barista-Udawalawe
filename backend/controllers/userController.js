import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        role: req.body.role || "customer", // Default to customer if not provided
        isBlocked: req.body.isBlocked || false // Fixed: was req.body.isBlocked.false
    });
    user.save()
        .then((result) => {
            res.status(201).send({ 
                success: true,
                message: "User created successfully",
                user: {
                    email: result.email,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    role: result.role
                }
            });
        })
        .catch((error) => {
            res.status(500).send({ 
                success: false,
                message: "Error creating user", 
                error: error.message 
            });
        });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((user) => {
            if (user == null) {
                return res.status(404).send({ 
                    success: false,
                    message: "User not found" 
                });
            }
            if (user.isBlocked === true) { // Fixed: was true0
                return res.status(403).send({ 
                    success: false,
                    message: "User is blocked" 
                });
            }
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) { // Fixed: was isPasswordCorrect (undefined variable)
                const token = jwt.sign(
                    {
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role, // Added role to token
                        isBlocked: user.isBlocked
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '24h' } // Added token expiration
                );
                res.json({
                    success: true,
                    message: "Login successful",
                    token: token,
                    role: user.role,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                });
            } else {
                res.status(401).send({ 
                    success: false,
                    message: "Invalid password" 
                });
            }
        })
        .catch((error) => { // Fixed: was err
            console.error("Login error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error" 
            });
        });
}

export function isCoustomer(req) { // Note: typo in function name (should be isCustomer)
    if(req.user == null) {
        return false;
    }
    if(req.user.role == "customer") {
        return true;
    }
    return false;
}

export function isAdmin(req) {
    if(req.user == null) {
        return false;
    }   
    if(req.user.role == "admin") {
        return true;
    }   
    return false;
}

export function isCashier(req) {
    if(req.user == null) {
        return false;
    }
    if(req.user.role == "cashier") {
        return true;
    }
    return false;
}

export function isCrew(req) {
    if(req.user == null) {
        return false;
    }
    if(req.user.role == "crew") {
        return true;
    }   
    return false;
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find(
            { role: { $in: ['customer', 'crew', 'cashier'] } },
            { password: 0 } // Exclude password from response
        );
        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error retrieving users", 
            error: error.message 
        });
    }
}

export async function toggleUserBlock(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    try {
        // Find user by email
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found"
            });
        }
    
        const newBlockStatus = !user.isBlocked;

        await User.updateOne( // Fixed: was updateObe (typo)
            { email: req.params.email },
            { isBlocked: newBlockStatus }
        );

        res.json({ // Fixed: was req.json (should be res.json)
            success: true,
            message: newBlockStatus ? "User blocked successfully" : "User unblocked successfully",
            isBlocked: newBlockStatus
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error updating user status", 
            error: error.message 
        });
    }
}

export async function userCount(req, res) {
    try {
        const count = await User.countDocuments({ role: 'customer' });
        res.status(200).json({
            success: true,
            count: count,
            message: "User count retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user count",
            error: error.message
        });
    }
}

export async function UpdateProfile(req, res) {
    try {
        const { email } = req.params;
        const { firstname, lastname, password } = req.body;

        const updateData = { // Fixed: was updates in some places, updateData in others
            firstname,
            lastname,
        };
        
        if (password) {
            updateData.password = bcrypt.hashSync(password, 8); // Fixed: was await bcrypt.hash (should use hashSync or make function async properly)
        }

        const result = await User.updateOne(
            { email }, 
            { $set: updateData } // Fixed: was updates, now updateData
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
        
        res.status(200).json({ 
            success: true,
            message: "Profile updated successfully" 
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error updating profile", 
            error: error.message 
        });
    }
}

export async function viewDetails(req, res) {
    const email = req.params.email;
    try {
        const user = await User.findOne(
            { email: email },
            { password: 0 } // Exclude password from response
        );
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user details",
            error: error.message
        });
    }
}