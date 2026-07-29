package com.hostelhub.backend.controller;

import com.hostelhub.backend.dto.admin.AdminStatsResponse;
import com.hostelhub.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ADMIN DASHBOARD

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {

        return "Welcome Admin";
    }

    // ADMIN ANALYTICS

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminStatsResponse
    getDashboardStats() {

        return adminService
                .getDashboardStats();
    }

    // APPROVE HOSTEL

    @PutMapping("/hostels/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String>
    approveHostel(@PathVariable Long id) {

        adminService.approveHostel(id);

        return ResponseEntity.ok(
                "Hostel approved successfully"
        );
    }

    // REJECT HOSTEL

    @PutMapping("/hostels/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String>
    rejectHostel(@PathVariable Long id) {

        adminService.rejectHostel(id);

        return ResponseEntity.ok(
                "Hostel rejected successfully"
        );
    }
    @GetMapping("/hostels/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingHostels() {

        return ResponseEntity.ok(
                adminService.getPendingHostels()
        );
    }
    
}