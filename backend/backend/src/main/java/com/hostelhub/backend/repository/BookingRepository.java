package com.hostelhub.backend.repository;

import com.hostelhub.backend.entity.Booking;
import com.hostelhub.backend.entity.Room;
import com.hostelhub.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // BOOKINGS OF A STUDENT
    List<Booking> findByStudent(User student);

    // BOOKINGS OF A ROOM
    List<Booking> findByRoom(Room room);
}