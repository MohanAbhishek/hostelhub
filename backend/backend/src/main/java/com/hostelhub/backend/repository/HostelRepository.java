package com.hostelhub.backend.repository;

import com.hostelhub.backend.entity.Hostel;
import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.enums.ApprovalStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

    List<Hostel> findByLandlord(User landlord);

    Optional<Hostel> findByIdAndLandlord(Long id, User landlord);

    // NEW METHOD
    List<Hostel> findByApprovalStatus(ApprovalStatus status);
}