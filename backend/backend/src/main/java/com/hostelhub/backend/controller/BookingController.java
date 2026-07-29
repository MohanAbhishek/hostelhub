package com.hostelhub.backend.controller;

import com.hostelhub.backend.dto.booking.BookingRequest;
import com.hostelhub.backend.dto.booking.BookingResponse;
import com.hostelhub.backend.service.BookingService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // CREATE BOOKING
    @PostMapping("/room/{roomId}")
    @PreAuthorize("hasRole('STUDENT')")
    public BookingResponse createBooking(
            @PathVariable Long roomId,
            @Valid @RequestBody BookingRequest request
    ) {

        return bookingService.createBooking(roomId, request);
    }
 // CANCEL BOOKING

    @DeleteMapping("/{bookingId}")
    @PreAuthorize("hasRole('STUDENT')")
    public void cancelBooking(
            @PathVariable Long bookingId
    ) {

        bookingService.cancelBooking(
                bookingId
        );
    }

    // LANDLORD BOOKINGS

    @GetMapping("/landlord")
    @PreAuthorize("hasRole('LANDLORD')")
    public List<BookingResponse>
    getLandlordBookings() {

        return bookingService
                .getLandlordBookings();
    }

    // GET MY BOOKINGS
    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('STUDENT')")
    public List<BookingResponse> getMyBookings() {

        return bookingService.getMyBookings();
    }
}