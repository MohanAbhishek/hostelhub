package com.hostelhub.backend.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse {

    private String token;

    private String type;

    private UserResponse user;
}