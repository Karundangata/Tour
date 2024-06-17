USE Tazama;
GO
CREATE OR ALTER PROCEDURE cancelBooking
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Bookings
    SET status = 'Cancelled', updatedAt = GETDATE()
    WHERE id = @id;
END;
