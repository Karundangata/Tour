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
exports.sendRegistrationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let config = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
};
function createTransporter(config) {
    return nodemailer_1.default.createTransport(config);
}
function sendEmail(messageOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = createTransporter(config);
        yield transporter.verify();
        yield transporter.sendMail(messageOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info);
        });
    });
}
function sendRegistrationEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../../Templates/register.ejs'), { name: user.Name }, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return;
            }
            let messageOptions = {
                to: user.Email,
                from: process.env.EMAIL,
                subject: 'Tazama Africa Holidays',
                html: data,
            };
            yield sendEmail(messageOptions);
        }));
    });
}
exports.sendRegistrationEmail = sendRegistrationEmail;
