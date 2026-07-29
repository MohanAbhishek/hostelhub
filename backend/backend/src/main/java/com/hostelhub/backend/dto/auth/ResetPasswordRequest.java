package com.hostelhub.backend.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {

    private String email;

    private String otp;

    private String newPassword;
}