package com.hostelhub.backend.dto.hostel;

import com.hostelhub.backend.enums.AccommodationType;
import com.hostelhub.backend.enums.RoomType;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class HostelRequest {

    @NotBlank(message = "Hostel name is required")
    private String hostelName;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotNull(message = "Price per month is required")
    @Positive(message = "Price per month must be greater than 0")
    private Double pricePerMonth;

    @NotNull(message = "Total rooms is required")
    @Positive(message = "Total rooms must be greater than 0")
    private Integer totalRooms;

    @NotNull(message = "Available rooms is required")
    @PositiveOrZero(message = "Available rooms cannot be negative")
    private Integer availableRooms;

    @NotNull(message = "Room type is required")
    private RoomType roomType;

    @NotNull(message = "Accommodation type is required")
    private AccommodationType accommodationType;

    private Boolean wifi;

    private Boolean food;

    private Boolean laundry;

    private Boolean parking;
}