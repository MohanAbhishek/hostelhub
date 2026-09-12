package com.hostelhub.backend.service;

import com.hostelhub.backend.dto.auth.AuthResponse;
import com.hostelhub.backend.dto.auth.LoginRequest;
import com.hostelhub.backend.dto.auth.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}