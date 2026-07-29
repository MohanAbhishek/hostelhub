package com.hostelhub.backend.service;

import com.hostelhub.backend.dto.booking.BookingRequest;
import com.hostelhub.backend.dto.booking.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(
            Long roomId,
            BookingRequest request
    );

    List<BookingResponse> getMyBookings();

    void cancelBooking(
            Long bookingId
    );

    List<BookingResponse>
    getLandlordBookings();
}