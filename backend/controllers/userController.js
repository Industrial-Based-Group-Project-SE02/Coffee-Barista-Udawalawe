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
        role: req.body.role ,
        isBlocked: req.body.isBlocked
    });
    user
    .save()
        .then((result) => {
            res.json({
                message: "User created successfully",
            })
        })
        .catch((error) => {
            res.status(500).json({ 
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
                    message: "User not found" 
                });
            }
            if (user.isBlocked === true) { // Fixed: was true0
                return res.status(403).json({ 
                    message: "Your Account is blocked" 
                });
            }
            const ispasswordIsValid = bcrypt.compareSync(password, user.password);
            if (ispasswordIsValid) { // Fixed: was isPasswordCorrect (undefined variable)
                const token = jwt.sign(
                    {
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role, // Added role to token
                        isBlocked: user.isBlocked
                    },
                    process.env.JWT_SECRET_KEY,
                );

                res.json({
                    message: "Login successful",
                    token: token,
                    role: user.role,
                    email: user.email,
                    firstname: user.firstname,
                });
            } else {
                res.status(401).json({ 
                    message: "Invalid password" 
                });
            }
        })
        .catch((error) => { // Fixed: was err
            console.error("Login error:", error);
            res.status(500).json({
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
            { role: { $in: ['customer', 'crew', 'cashier']}});
        res.json(users);
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
        const count = await User.countDocuments({ role: { $in: [ "customer", "crew", "cashier"] } });
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

        // ✅ FIXED: Use consistent variable name 'updateData'
        const updateData = {
            firstname,
            lastname,
        };
        
        // ✅ FIXED: Changed 'updates' to 'updateData'
        if (password) {
            updateData.password = bcrypt.hashSync(password, 8);
        }

        // ✅ FIXED: Changed 'updates' to 'updateData'
        const result = await User.updateOne(
            { email }, 
            { $set: updateData }
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
        console.error("UpdateProfile error:", error);
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
        const user = await User.findOne({ email: email });
        res.json(user);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user details",
            error: error.message
        });
    }
        
}