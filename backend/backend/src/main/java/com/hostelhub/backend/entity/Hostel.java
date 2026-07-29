package com.hostelhub.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hostelhub.backend.enums.AccommodationType;
import com.hostelhub.backend.enums.ApprovalStatus;
import com.hostelhub.backend.enums.HostelStatus;
import com.hostelhub.backend.enums.RoomType;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "hostels")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hostelName;

    private String description;

    private String address;

    private String city;

    private String state;

    private Double pricePerMonth;

    private Integer totalRooms;

    private Integer availableRooms;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    private AccommodationType accommodationType;

    @Enumerated(EnumType.STRING)
    private HostelStatus hostelStatus;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    private Boolean wifi;

    private Boolean food;

    private Boolean laundry;

    private Boolean parking;

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;

    @OneToMany(
            mappedBy = "hostel",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    private List<Room> rooms;
}