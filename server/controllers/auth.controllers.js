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
        res.status(201).json({status: httpStatusText.SUCCESS, data: {token}})
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
            User.token = token;
            res.status(200).json({status: httpStatusText.SUCCESS, data: token})
        }
    }
)

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({status: httpStatusText.SUCCESS, data: null});
}

const getAllUsers = asyncWrapper(
    async(req, res) => {
        const users = await User.find({"__v": false});
        res.status(200).json({status: httpStatusText.SUCCESS, data: users})
    }
)

const addUser = () => {
    signUp();
}

const deleteUser = asyncWrapper(
    async(req, res, next) => {
        const email = req.body;
        const findUser = User.find({email: email});

        if(!findUser){
            const err = appError.create('This user is not registered', 404, httpStatusText.ERROR)
            return next(err);
        }
        
        await delete findUser;
        res.status(200).json({status: httpStatusText.SUCCESS, data: null});
    }
)

module.exports = {
    signUp,
    login,
    logout,
    getAllUsers,
    addUser,
    deleteUser
}