package com.hostelhub.backend.service;
import com.hostelhub.backend.entity.Room;
import com.hostelhub.backend.repository.RoomRepository;
import com.hostelhub.backend.dto.hostel.HostelRequest;
import com.hostelhub.backend.dto.hostel.HostelResponse;
import com.hostelhub.backend.dto.hostel.UpdateHostelRequest;
import com.hostelhub.backend.entity.Hostel;
import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.enums.ApprovalStatus;
import com.hostelhub.backend.exception.ResourceNotFoundException;
import com.hostelhub.backend.mapper.HostelMapper;
import com.hostelhub.backend.repository.HostelRepository;
import com.hostelhub.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HostelService {

    private final UserRepository userRepository;

    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;

    // CREATE HOSTEL
    public HostelResponse createHostel(
            HostelRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User landlord =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );

        Hostel hostel =
                HostelMapper.toEntity(request);

        hostel.setLandlord(landlord);

        hostel.setApprovalStatus(
                ApprovalStatus.PENDING
        );

        Hostel savedHostel =
                hostelRepository.save(hostel);

        // AUTO CREATE ROOMS
        int bedsPerRoom = switch (
                request.getRoomType()
        ) {

            case SINGLE -> 1;

            case DOUBLE -> 2;

            case TRIPLE -> 3;

            default -> 2;
        };
        
        for (
                int i = 1;
                i <= request.getTotalRooms();
                i++
        ) {

            Room room =
                    Room.builder()

                            .roomNumber(
                                    "Room-" + i
                            )

                            .roomType(
                                    request.getRoomType()
                            )

                            // DEFAULT CONFIG
                            .totalBeds(bedsPerRoom)

                            .occupiedBeds(0)

                            .availableBeds(bedsPerRoom)
                            .pricePerMonth(
                                    request.getPricePerMonth()
                            )

                            .ac(false)

                            .available(true)

                            .hostel(savedHostel)

                            .build();

            roomRepository.save(room);
        }

        return HostelMapper.toResponse(
                savedHostel
        );
    }

    // GET ALL HOSTELS
    public List<HostelResponse> getAllHostels() {

        return hostelRepository
                .findByApprovalStatus(ApprovalStatus.APPROVED)
                .stream()
                .map(HostelMapper::toResponse)
                .collect(Collectors.toList());
    }

    // GET MY HOSTELS
    public List<HostelResponse> getMyHostels() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User landlord = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return hostelRepository.findByLandlord(landlord)
                .stream()
                .map(HostelMapper::toResponse)
                .collect(Collectors.toList());
    }

    // UPDATE HOSTEL
    public HostelResponse updateHostel(
            Long hostelId,
            UpdateHostelRequest request,
            User currentUser
    ) {

        Hostel hostel = hostelRepository
                .findByIdAndLandlord(hostelId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hostel not found or unauthorized"
                        ));

        hostel.setHostelName(request.getName());
        hostel.setAddress(request.getAddress());
        hostel.setCity(request.getCity());
        hostel.setState(request.getState());
        hostel.setDescription(request.getDescription());
        hostel.setTotalRooms(request.getTotalRooms());
        hostel.setAvailableRooms(request.getAvailableRooms());
        hostel.setRoomType(request.getRoomType());
        hostel.setAccommodationType(request.getAccommodationType());
        hostel.setPricePerMonth(request.getPricePerMonth());

        Hostel updatedHostel = hostelRepository.save(hostel);

        return HostelMapper.toResponse(updatedHostel);
    }

    // GET HOSTEL BY ID
    public HostelResponse getHostelById(Long id) {

        Hostel hostel = hostelRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hostel not found"
                        ));

        return HostelMapper.toResponse(hostel);
    }

    // DELETE HOSTEL
    public void deleteHostel(
            Long hostelId,
            User currentUser
    ) {

        Hostel hostel = hostelRepository
                .findByIdAndLandlord(hostelId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hostel not found or unauthorized"
                        ));

        hostelRepository.delete(hostel);
    }
}