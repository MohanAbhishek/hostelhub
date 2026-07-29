package com.hostelhub.backend.controller;

import com.hostelhub.backend.dto.room.RoomRequest;
import com.hostelhub.backend.dto.room.RoomResponse;
import com.hostelhub.backend.service.RoomService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // CREATE ROOM
    @PostMapping("/hostel/{hostelId}")
    @PreAuthorize("hasRole('LANDLORD')")
    public RoomResponse createRoom(
            @PathVariable Long hostelId,
            @Valid @RequestBody RoomRequest request
    ) {

        return roomService.createRoom(hostelId, request);
    }
 // UPDATE ROOM

    @PutMapping("/{roomId}")
    @PreAuthorize("hasRole('LANDLORD')")
    public RoomResponse updateRoom(
            @PathVariable Long roomId,
            @Valid @RequestBody RoomRequest request
    ) {

        return roomService.updateRoom(
                roomId,
                request
        );
    }

    // DELETE ROOM

    @DeleteMapping("/{roomId}")
    @PreAuthorize("hasRole('LANDLORD')")
    public void deleteRoom(
            @PathVariable Long roomId
    ) {

        roomService.deleteRoom(roomId);
    }

    // GET AVAILABLE ROOMS

    @GetMapping("/available")
    public List<RoomResponse>
    getAvailableRooms() {

        return roomService.getAvailableRooms();
    }

    // GET ROOMS BY HOSTEL
    @GetMapping("/hostel/{hostelId}")
    public List<RoomResponse> getRoomsByHostel(
            @PathVariable Long hostelId
    ) {

        return roomService.getRoomsByHostel(hostelId);
    }
}