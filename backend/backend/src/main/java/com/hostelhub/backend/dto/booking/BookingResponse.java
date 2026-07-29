package com.hostelhub.backend.dto.booking;

import com.hostelhub.backend.enums.BookingStatus;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BookingResponse {

    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Double totalAmount;

    private Boolean paymentCompleted;

    private BookingStatus bookingStatus;

    private String studentName;

    private String studentEmail;

    private String roomNumber;

    private String hostelName;
}