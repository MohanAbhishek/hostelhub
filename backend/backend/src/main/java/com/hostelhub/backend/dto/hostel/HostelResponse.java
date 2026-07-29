package com.hostelhub.backend.dto.hostel;

import java.util.List;

import com.hostelhub.backend.dto.room.RoomResponse;
import com.hostelhub.backend.enums.AccommodationType;
import com.hostelhub.backend.enums.HostelStatus;
import com.hostelhub.backend.enums.RoomType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HostelResponse {

    private Long id;

    private String hostelName;

    private String description;

    private String address;

    private String city;

    private String state;

    private Double pricePerMonth;

    private Integer totalRooms;

    private Integer availableRooms;

    private RoomType roomType;

    private AccommodationType accommodationType;

    private HostelStatus hostelStatus;

    private Boolean wifi;

    private Boolean food;

    private Boolean laundry;

    private Boolean parking;

    private String landlordName;

    private String landlordEmail;

    private List<RoomResponse> rooms;
}