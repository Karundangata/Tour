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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.updateBooking = exports.getBookingById = exports.getBookings = exports.addBooking = void 0;
const uuid_1 = require("uuid");
const DatabaseHelpers_1 = require("../DatabaseHelpers");
const dbHelper = new DatabaseHelpers_1.DbHelper();
const addBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, tourId, hotelId, bookingDate } = req.body;
        const id = (0, uuid_1.v4)();
        yield dbHelper.exec('addBooking', { id, userId, tourId, hotelId, bookingDate });
        res.status(201).json({ message: 'Booking added successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.addBooking = addBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield dbHelper.getAll('getBookings');
        res.json(bookings);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getBookings = getBookings;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield dbHelper.get('getBookingById', { id: req.params.id });
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getBookingById = getBookingById;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        yield dbHelper.exec('updateBooking', { id: req.params.id, status });
        res.json({ message: 'Booking updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateBooking = updateBooking;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('cancelBooking', { id: req.params.id });
        res.json({ message: 'Booking cancelled successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.cancelBooking = cancelBooking;
