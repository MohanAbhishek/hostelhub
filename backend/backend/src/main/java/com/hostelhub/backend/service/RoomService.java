package com.hostelhub.backend.service;

import com.hostelhub.backend.dto.room.RoomRequest;
import com.hostelhub.backend.dto.room.RoomResponse;

import java.util.List;

public interface RoomService {

    RoomResponse createRoom(
            Long hostelId,
            RoomRequest request
    );

    List<RoomResponse> getRoomsByHostel(
            Long hostelId
    );

    RoomResponse updateRoom(
            Long roomId,
            RoomRequest request
    );

    void deleteRoom(
            Long roomId
    );

    List<RoomResponse> getAvailableRooms();
}