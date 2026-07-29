package com.hostelhub.backend.service;
import java.util.List;
import com.hostelhub.backend.dto.response.HostelResponseDto;
import com.hostelhub.backend.dto.admin.AdminStatsResponse;

public interface AdminService {

    AdminStatsResponse getDashboardStats();

    void approveHostel(Long hostelId);

    void rejectHostel(Long hostelId);
    List<HostelResponseDto> getPendingHostels();
}