"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const tourRoutes_1 = __importDefault(require("./Routes/tourRoutes"));
const hotelRoutes_1 = __importDefault(require("./Routes/hotelRoutes"));
const bookingRoutes_1 = __importDefault(require("./Routes/bookingRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, express_1.json)());
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/tours', tourRoutes_1.default);
app.use('/hotels', hotelRoutes_1.default);
app.use('/bookings', bookingRoutes_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
