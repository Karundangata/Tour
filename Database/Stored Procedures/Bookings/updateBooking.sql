USE Tazama;
GO
CREATE OR ALTER PROCEDURE updateBooking
    @id VARCHAR(36),
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Bookings
    SET status = @status, updatedAt = GETDATE()
    WHERE id = @id;
END;
