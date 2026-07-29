package com.hostelhub.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hostelhub.backend.enums.RoomType;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "rooms")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private Integer totalBeds;

    private Integer occupiedBeds;

    private Integer availableBeds;

    private Double pricePerMonth;

    private Boolean ac;

    private Boolean available;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Booking> bookings;
}