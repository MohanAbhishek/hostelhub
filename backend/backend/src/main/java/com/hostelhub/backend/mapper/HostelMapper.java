package com.hostelhub.backend.mapper;

import java.util.stream.Collectors;

import com.hostelhub.backend.dto.hostel.HostelRequest;
import com.hostelhub.backend.dto.hostel.HostelResponse;
import com.hostelhub.backend.dto.room.RoomResponse;
import com.hostelhub.backend.entity.Hostel;
import com.hostelhub.backend.enums.HostelStatus;

public class HostelMapper {

    // CONVERT REQUEST DTO -> ENTITY

    public static Hostel toEntity(HostelRequest request) {

        return Hostel.builder()
                .hostelName(request.getHostelName())
                .description(request.getDescription())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pricePerMonth(request.getPricePerMonth())
                .totalRooms(request.getTotalRooms())
                .availableRooms(request.getAvailableRooms())
                .roomType(request.getRoomType())
                .accommodationType(request.getAccommodationType())
                .hostelStatus(HostelStatus.AVAILABLE)
                .wifi(request.getWifi())
                .food(request.getFood())
                .laundry(request.getLaundry())
                .parking(request.getParking())
                .build();
    }

    // CONVERT ENTITY -> RESPONSE DTO

    public static HostelResponse toResponse(Hostel hostel) {

        return HostelResponse.builder()

                .id(hostel.getId())

                .hostelName(hostel.getHostelName())

                .description(hostel.getDescription())

                .address(hostel.getAddress())

                .city(hostel.getCity())

                .state(hostel.getState())

                .pricePerMonth(hostel.getPricePerMonth())

                .totalRooms(hostel.getTotalRooms())

                .availableRooms(hostel.getAvailableRooms())

                .roomType(hostel.getRoomType())

                .accommodationType(hostel.getAccommodationType())

                .hostelStatus(hostel.getHostelStatus())

                .wifi(hostel.getWifi())

                .food(hostel.getFood())

                .laundry(hostel.getLaundry())

                .parking(hostel.getParking())

                .landlordName(
                        hostel.getLandlord() != null
                                ? hostel.getLandlord().getFullName()
                                : null
                )

                .landlordEmail(
                        hostel.getLandlord() != null
                                ? hostel.getLandlord().getEmail()
                                : null
                )

                .rooms(
                        hostel.getRooms() != null
                                ? hostel.getRooms()
                                .stream()
                                .map(room -> RoomResponse.builder()
                                        .id(room.getId())
                                        .roomNumber(room.getRoomNumber())
                                        .roomType(room.getRoomType())
                                        .totalBeds(room.getTotalBeds())
                                        .availableBeds(room.getAvailableBeds())
                                        .occupiedBeds(room.getOccupiedBeds())
                                        .pricePerMonth(room.getPricePerMonth())
                                        .available(room.getAvailable())
                                        .build()
                                )
                                .collect(Collectors.toList())
                                : null
                )

                .build();
    }
}