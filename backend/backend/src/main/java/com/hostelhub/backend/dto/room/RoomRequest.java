package com.hostelhub.backend.dto.room;

import com.hostelhub.backend.enums.RoomType;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class RoomRequest {

    @NotBlank(message = "Room number is required")
    private String roomNumber;

    @NotNull(message = "Room type is required")
    private RoomType roomType;

    @NotNull(message = "Total beds is required")
    @Positive(message = "Total beds must be greater than 0")
    private Integer totalBeds;

    @NotNull(message = "Occupied beds is required")
    @PositiveOrZero(message = "Occupied beds cannot be negative")
    private Integer occupiedBeds;

    @NotNull(message = "Available beds is required")
    @PositiveOrZero(message = "Available beds cannot be negative")
    private Integer availableBeds;

    @NotNull(message = "Price per month is required")
    @Positive(message = "Price per month must be greater than 0")
    private Double pricePerMonth;

    private Boolean ac;

    private Boolean available;
}