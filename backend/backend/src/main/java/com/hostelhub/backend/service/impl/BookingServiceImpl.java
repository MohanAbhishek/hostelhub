package com.hostelhub.backend.service.impl;
import com.hostelhub.backend.exception.BadRequestException;
import com.hostelhub.backend.exception.ResourceNotFoundException;
import com.hostelhub.backend.dto.booking.BookingRequest;
import com.hostelhub.backend.dto.booking.BookingResponse;
import com.hostelhub.backend.entity.Booking;
import com.hostelhub.backend.entity.Room;
import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.enums.BookingStatus;
import com.hostelhub.backend.repository.BookingRepository;
import com.hostelhub.backend.repository.RoomRepository;
import com.hostelhub.backend.repository.UserRepository;
import com.hostelhub.backend.service.BookingService;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl
        implements BookingService {

    private final BookingRepository bookingRepository;

    private final RoomRepository roomRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(
            Long roomId,
            BookingRequest request
    ) {

        validateBookingDates(request);

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User student =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        Room room =
                roomRepository
                        .findById(roomId)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Room not found"
                        ));

        if (room.getAvailableBeds() <= 0) {

        	throw new BadRequestException(
        	        "No beds available"
        	);
        }

        room.setOccupiedBeds(
                room.getOccupiedBeds() + 1
        );

        room.setAvailableBeds(
                room.getAvailableBeds() - 1
        );

        if (
                room.getAvailableBeds() == 0
        ) {

            room.setAvailable(false);
        }

        roomRepository.save(room);

        Booking booking =
                Booking.builder()

                        .checkInDate(
                                request.getCheckInDate()
                        )

                        .checkOutDate(
                                request.getCheckOutDate()
                        )

                        .totalAmount(
                                request.getTotalAmount()
                        )

                        .paymentCompleted(false)

                        .bookingStatus(
                                BookingStatus.CONFIRMED
                        )

                        .student(student)

                        .room(room)

                        .build();

        Booking savedBooking =
                bookingRepository.save(booking);

        return mapToResponse(savedBooking);
    }

    @Override
    public List<BookingResponse>
    getMyBookings() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User student =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        return bookingRepository
                .findByStudent(student)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void cancelBooking(
            Long bookingId
    ) {

        Booking booking =
                bookingRepository
                        .findById(bookingId)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found"
                        ));

        Room room =
                booking.getRoom();

        room.setOccupiedBeds(
                room.getOccupiedBeds() - 1
        );

        room.setAvailableBeds(
                room.getAvailableBeds() + 1
        );

        room.setAvailable(true);

        roomRepository.save(room);

        booking.setBookingStatus(
                BookingStatus.CANCELLED
        );

        bookingRepository.save(booking);
    }

    @Override
    public List<BookingResponse>
    getLandlordBookings() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User landlord =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        return bookingRepository
                .findAll()
                .stream()

                .filter(booking ->

                        booking.getRoom()
                                .getHostel()
                                .getLandlord()
                                .getId()
                                .equals(
                                        landlord.getId()
                                )
                )

                .map(this::mapToResponse)

                .collect(Collectors.toList());
    }

    // VALIDATION

    private void validateBookingDates(
            BookingRequest request
    ) {

        if (
                request.getCheckOutDate()
                        .isBefore(
                                request.getCheckInDate()
                        )
        ) {

        	new BadRequestException(
        	        "Check-out date cannot be before check-in date"
        	);
        }
    }

    // RESPONSE MAPPER

    private BookingResponse
    mapToResponse(Booking booking) {

        return BookingResponse.builder()

                .id(booking.getId())

                .checkInDate(
                        booking.getCheckInDate()
                )

                .checkOutDate(
                        booking.getCheckOutDate()
                )

                .totalAmount(
                        booking.getTotalAmount()
                )

                .paymentCompleted(
                        booking.getPaymentCompleted()
                )

                .bookingStatus(
                        booking.getBookingStatus()
                )

                .studentName(
                        booking.getStudent()
                                .getFullName()
                )

                .studentEmail(
                        booking.getStudent()
                                .getEmail()
                )

                .roomNumber(
                        booking.getRoom()
                                .getRoomNumber()
                )

                .hostelName(
                        booking.getRoom()
                                .getHostel()
                                .getHostelName()
                )

                .build();
    }
}