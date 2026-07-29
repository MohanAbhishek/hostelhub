package com.hostelhub.backend.service.impl;
import java.util.List;

import com.hostelhub.backend.dto.response.HostelResponseDto;
import com.hostelhub.backend.dto.admin.AdminStatsResponse;
import com.hostelhub.backend.entity.Hostel;
import com.hostelhub.backend.enums.ApprovalStatus;
import com.hostelhub.backend.repository.BookingRepository;
import com.hostelhub.backend.repository.HostelRepository;
import com.hostelhub.backend.repository.RoomRepository;
import com.hostelhub.backend.repository.UserRepository;
import com.hostelhub.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl
        implements AdminService {

    private final UserRepository userRepository;

    private final HostelRepository hostelRepository;

    private final RoomRepository roomRepository;

    private final BookingRepository bookingRepository;

    @Override
    public AdminStatsResponse
    getDashboardStats() {

        return AdminStatsResponse.builder()

                .totalUsers(
                        userRepository.count()
                )

                .totalHostels(
                        hostelRepository.count()
                )

                .totalRooms(
                        roomRepository.count()
                )

                .totalBookings(
                        bookingRepository.count()
                )

                .availableRooms(
                        roomRepository
                                .countByAvailableTrue()
                )

                .occupiedRooms(
                        roomRepository
                                .countByAvailableFalse()
                )

                .build();
    }

    @Override
    public void approveHostel(Long hostelId) {

        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found"));

        hostel.setApprovalStatus(
                ApprovalStatus.APPROVED
        );

        hostelRepository.save(hostel);
    }

    @Override
    public void rejectHostel(Long hostelId) {

        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new RuntimeException("Hostel not found"));

        hostel.setApprovalStatus(
                ApprovalStatus.REJECTED
        );

        hostelRepository.save(hostel);
    }
    @Override
    public List<HostelResponseDto> getPendingHostels() {

        List<Hostel> hostels =
                hostelRepository.findByApprovalStatus(
                        ApprovalStatus.PENDING
                );

        return hostels.stream()
                .map(this::mapToDto)
                .toList();
    }
    private HostelResponseDto mapToDto(Hostel hostel) {

        return HostelResponseDto.builder()
                .id(hostel.getId())
                .hostelName(hostel.getHostelName())
                .city(hostel.getCity())
                .address(hostel.getAddress())
                .pricePerMonth(hostel.getPricePerMonth())
                .approvalStatus(hostel.getApprovalStatus().name())
                .build();
    }
}