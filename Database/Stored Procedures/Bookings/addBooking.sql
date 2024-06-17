USE Tazama;
GO
CREATE OR ALTER PROCEDURE addBooking
    @id VARCHAR(36),
    @userId VARCHAR(36),
    @tourId VARCHAR(36),
    @hotelId VARCHAR(36),
    @bookingDate DATETIME
AS
BEGIN
    INSERT INTO Bookings (id, userId, tourId, hotelId, bookingDate)
    VALUES (@id, @userId, @tourId, @hotelId, @bookingDate);
END;

