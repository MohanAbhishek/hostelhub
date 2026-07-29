package com.hostelhub.backend.controller;

import com.hostelhub.backend.dto.hostel.HostelRequest;
import com.hostelhub.backend.dto.hostel.HostelResponse;
import com.hostelhub.backend.dto.hostel.UpdateHostelRequest;
import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.service.HostelService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hostels")
@RequiredArgsConstructor
public class HostelController {

    private final HostelService hostelService;

    // CREATE HOSTEL
    @PostMapping
    @PreAuthorize("hasRole('LANDLORD')")
    public HostelResponse createHostel(
            @Valid @RequestBody HostelRequest request
    ) {

        return hostelService.createHostel(request);
    }

    // GET MY HOSTELS
    @GetMapping("/my-hostels")
    @PreAuthorize("hasRole('LANDLORD')")
    public List<HostelResponse> getMyHostels() {

        return hostelService.getMyHostels();
    }

    // UPDATE HOSTEL
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('LANDLORD')")
    public ResponseEntity<HostelResponse> updateHostel(
            @PathVariable Long id,
            @Valid @RequestBody UpdateHostelRequest request,
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        HostelResponse response = hostelService.updateHostel(
                id,
                request,
                currentUser
        );

        return ResponseEntity.ok(response);
    }
    
 // GET ALL HOSTELS
    @GetMapping
    public List<HostelResponse> getAllHostels() {

        return hostelService.getAllHostels();
    }
    
 // GET HOSTEL BY ID
    @GetMapping("/{id}")
    public HostelResponse getHostelById(
            @PathVariable Long id
    ) {

        return hostelService.getHostelById(id);
    }

    // DELETE HOSTEL
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('LANDLORD')")
    public ResponseEntity<String> deleteHostel(
            @PathVariable Long id,
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        hostelService.deleteHostel(id, currentUser);

        return ResponseEntity.ok("Hostel deleted successfully");
    }
}