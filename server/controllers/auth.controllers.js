const User = require('../models/user.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = asyncWrapper(
    async(req, res, next) => {
        const {email, name, password, role} = req.body;
        if(!email || !name || !password){
            const err = appError.create('name, email and password are required', 400, httpStatusText.ERROR);
            next(err)
        };

        const user = await User.findOne({email});
        
        if(user){
            const err = appError.create('choose another email or password');
            next(err);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            role
        });
        
        const token = jwt.sign({email: newUser.email, id: newUser._id, role: newUser.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        newUser.token = token;
        await newUser.save();
        res.status(201).json({status: httpStatusText.SUCCESS, data: {token, email: newUser.email, role: user.role}})
    }
)

const login = asyncWrapper(
    async(req, res, next) => {
        const{email, password} = req.body;

        if(!email || !password){
            const error = appError.create('the email and password are required', 400, httpStatusText.ERROR);
            return next(error);
        }
        
        const user = await User.findOne({email});
        
        if(!user){
            const error = appError.create('something is wrong', 400, httpStatusText.ERROR);
            return next(error);
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        
        if(!matchedPassword){
            const err = appError.create('something is wrong.', 400, httpStatusText.ERROR)
            return next(err)
        }

        if(user && matchedPassword){
            const token = await jwt.sign({email: user.email, id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            user.token = token;
            res.status(200).json({status: httpStatusText.SUCCESS, data: {token, email: user.email, role: user.role}})
        }
    }
)

const refreshToken = asyncWrapper(
    async(req, res) => {
        const {token} = req.body;
        if(token){
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if(err){
                    if(err.name === 'TokenExpiredError'){
                    const decoded = jwt.decode(token);
                    const newToken = jwt.sign({email: decoded.email, id: decoded._id, role: decoded.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
                    return res.status(200).json({token: newToken});
                }
            }
            });
        }else{
            return res.status(401).json('Token is required.');
        }
    }
)

const getAllUsers = asyncWrapper(
    async(req, res) => {
        const users = await User.find({"__v": false});
        const totalAdmins = await User.find({role: "ADMIN"});
        const totalUsers = await User.find({role: "USER"});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {users, totalAdmins: totalAdmins.length, totalUsers: totalUsers.length}})
    }
)

const addUser = asyncWrapper(
    async(req, res, next) => {
        const {email, name, password, role} = req.body;
        if(!email || !name || !password){
            const err = appError.create('name, email and password are required', 400, httpStatusText.ERROR);
            next(err)
        };

        const user = await User.findOne({email});
        
        if(user){
            const err = appError.create('choose another email or password');
            next(err);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            role
        });
        
        const token = jwt.sign({email: newUser.email, id: newUser._id, role: newUser.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        newUser.token = token;
        await newUser.save();
        const users = await User.find();
        res.status(201).json({status: httpStatusText.SUCCESS, data: {users}})
    }
)

const deleteUser = asyncWrapper(
    async(req, res, next) => {
        const id = req.body.id;

        if(!id){
            const err = appError.create('ID is required', 401, httpStatusText.ERROR)
            return next(err);
        }

        await User.deleteOne({ _id: id });
        const users = await User.find();
        const totalAdmins = await User.find({role: "ADMIN"});
        const totalUsers = await User.find({role: "USER"});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {users, totalAdmins: totalAdmins.length, totalUsers: totalUsers.length}});
    }
)

module.exports = {
    signUp,
    login,
    refreshToken,
    getAllUsers,
    addUser,
    deleteUser
}