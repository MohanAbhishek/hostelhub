package com.hostelhub.backend.dto.auth;

import com.hostelhub.backend.enums.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class UserResponse {

    private UUID id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private Role role;
}