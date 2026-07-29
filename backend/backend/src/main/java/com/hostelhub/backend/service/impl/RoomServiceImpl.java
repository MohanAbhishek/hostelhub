package com.hostelhub.backend.service.impl;
import com.hostelhub.backend.exception.BadRequestException;
import com.hostelhub.backend.exception.ResourceNotFoundException;
import com.hostelhub.backend.dto.room.RoomRequest;
import com.hostelhub.backend.dto.room.RoomResponse;
import com.hostelhub.backend.entity.Hostel;
import com.hostelhub.backend.entity.Room;
import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.repository.HostelRepository;
import com.hostelhub.backend.repository.RoomRepository;
import com.hostelhub.backend.repository.UserRepository;
import com.hostelhub.backend.service.RoomService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl
        implements RoomService {

    private final RoomRepository roomRepository;

    private final HostelRepository hostelRepository;

    private final UserRepository userRepository;

    @Override
    public RoomResponse createRoom(
            Long hostelId,
            RoomRequest request
    ) {

        validateRoom(request);

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

        Hostel hostel =
                hostelRepository
                        .findByIdAndLandlord(
                                hostelId,
                                landlord
                        )
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hostel not found or unauthorized"
                        ));

        Integer availableBeds =
                request.getTotalBeds()
                        - request.getOccupiedBeds();

        Room room = Room.builder()

                .roomNumber(
                        request.getRoomNumber()
                )

                .roomType(
                        request.getRoomType()
                )

                .totalBeds(
                        request.getTotalBeds()
                )

                .occupiedBeds(
                        request.getOccupiedBeds()
                )

                .availableBeds(
                        availableBeds
                )

                .pricePerMonth(
                        request.getPricePerMonth()
                )

                .ac(
                        request.getAc()
                )

                .available(
                        availableBeds > 0
                )

                .hostel(hostel)

                .build();

        Room savedRoom =
                roomRepository.save(room);

        return mapToResponse(savedRoom);
    }

    @Override
    public List<RoomResponse>
    getRoomsByHostel(Long hostelId) {

        Hostel hostel =
                hostelRepository
                        .findById(hostelId)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hostel not found"
                        ));

        return roomRepository
                .findByHostel(hostel)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RoomResponse updateRoom(
            Long roomId,
            RoomRequest request
    ) {

        validateRoom(request);

        Room room =
                roomRepository
                        .findById(roomId)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Room not found"
                        ));

        Integer availableBeds =
                request.getTotalBeds()
                        - request.getOccupiedBeds();

        room.setRoomNumber(
                request.getRoomNumber()
        );

        room.setRoomType(
                request.getRoomType()
        );

        room.setTotalBeds(
                request.getTotalBeds()
        );

        room.setOccupiedBeds(
                request.getOccupiedBeds()
        );

        room.setAvailableBeds(
                availableBeds
        );

        room.setPricePerMonth(
                request.getPricePerMonth()
        );

        room.setAc(
                request.getAc()
        );

        room.setAvailable(
                availableBeds > 0
        );

        Room updatedRoom =
                roomRepository.save(room);

        return mapToResponse(updatedRoom);
    }

    @Override
    public void deleteRoom(Long roomId) {

        Room room =
                roomRepository
                        .findById(roomId)
                        .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Room not found"
                        ));

        roomRepository.delete(room);
    }

    @Override
    public List<RoomResponse>
    getAvailableRooms() {

        return roomRepository
                .findByAvailableTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // VALIDATION

    private void validateRoom(
            RoomRequest request
    ) {

        if (
                request.getOccupiedBeds()
                        > request.getTotalBeds()
        ) {

        	new BadRequestException(
        	        "Occupied beds cannot exceed total beds"
        	);
        }
    }

    // RESPONSE MAPPER

    private RoomResponse mapToResponse(
            Room room
    ) {

        return RoomResponse.builder()

                .id(room.getId())

                .roomNumber(
                        room.getRoomNumber()
                )

                .roomType(
                        room.getRoomType()
                )

                .totalBeds(
                        room.getTotalBeds()
                )

                .occupiedBeds(
                        room.getOccupiedBeds()
                )

                .availableBeds(
                        room.getAvailableBeds()
                )

                .pricePerMonth(
                        room.getPricePerMonth()
                )

                .ac(room.getAc())

                .available(
                        room.getAvailable()
                )

                .hostelId(
                        room.getHostel().getId()
                )

                .hostelName(
                        room.getHostel()
                                .getHostelName()
                )

                .build();
    }
}