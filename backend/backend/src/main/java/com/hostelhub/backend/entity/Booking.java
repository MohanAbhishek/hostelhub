package com.hostelhub.backend.entity;

import com.hostelhub.backend.enums.BookingStatus;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Double totalAmount;

    private Boolean paymentCompleted;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    // STUDENT WHO BOOKED
    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    // ROOM BOOKED
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}