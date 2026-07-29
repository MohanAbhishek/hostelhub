package com.hostelhub.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HostelResponseDto {

    private Long id;

    private String hostelName;

    private String city;

    private String address;

    private Double pricePerMonth;

    private String approvalStatus;
}