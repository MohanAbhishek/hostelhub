package com.hostelhub.backend.dto.room;

import com.hostelhub.backend.enums.RoomType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomResponse {

    private Long id;

    private String roomNumber;

    private RoomType roomType;

    private Integer totalBeds;

    private Integer occupiedBeds;

    private Integer availableBeds;

    private Double pricePerMonth;

    private Boolean ac;

    private Boolean available;

    private Long hostelId;

    private String hostelName;
}