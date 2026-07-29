package com.hostelhub.backend.repository;

import com.hostelhub.backend.entity.Room;
import com.hostelhub.backend.entity.Hostel;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository
extends JpaRepository<Room, Long> {

List<Room> findByHostel(
    Hostel hostel
);

List<Room> findByAvailableTrue();
Long countByAvailableTrue();

Long countByAvailableFalse();
}