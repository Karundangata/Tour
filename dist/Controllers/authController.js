"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const DatabaseHelpers_1 = require("../DatabaseHelpers");
const dotenv_1 = __importDefault(require("dotenv"));
const Helpers_1 = require("../Helpers");
const Nodemailer_1 = require("../Nodemailer");
dotenv_1.default.config();
const dbHelper = new DatabaseHelpers_1.DbHelper();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = Helpers_1.RegisterSchema.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.details[0].message });
        const { Name, Email, Password, isAdmin } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(Password, 10);
        const user = {
            Id: (0, uuid_1.v4)(),
            Name,
            Email,
            Password: hashedPassword,
            isAdmin,
            isDeleted: 0,
            isEmailSent: 0
        };
        yield dbHelper.exec('addUser', {
            Id: user.Id,
            Name: user.Name,
            Email: user.Email,
            Password: user.Password,
            isAdmin: user.isAdmin,
            isDeleted: user.isDeleted,
            isEmailSent: user.isEmailSent
        });
        yield (0, Nodemailer_1.sendRegistrationEmail)(user);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield dbHelper.get('getUserByEmail', { email });
        // if (!user) return res.status(404).json({ message: 'User not found' });
        // const isMatch = await bcrypt.compare(password, user.Password);
        // if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ Sub: user.Id, Name: user.Name, isAdmin: user.isAdmin }, process.env.SECRET);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dbHelper.getAll('getUsers');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dbHelper.get('getUserById', { id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, isAdmin } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield dbHelper.exec('updateUser', { id: req.params.id, name, email, password: hashedPassword, isAdmin });
        res.json({ message: 'User updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('deleteUser', { id: req.params.id });
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.deleteUser = deleteUser;
