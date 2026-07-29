package com.hostelhub.backend.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminStatsResponse {

    private Long totalUsers;

    private Long totalHostels;

    private Long totalRooms;

    private Long totalBookings;

    private Long availableRooms;

    private Long occupiedRooms;
}