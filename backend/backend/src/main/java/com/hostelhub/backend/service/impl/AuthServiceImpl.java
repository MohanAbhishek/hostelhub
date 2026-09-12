package com.hostelhub.backend.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

import com.hostelhub.backend.dto.auth.AuthResponse;
import com.hostelhub.backend.dto.auth.LoginRequest;
import com.hostelhub.backend.dto.auth.RegisterRequest;
import com.hostelhub.backend.dto.auth.UserResponse;

import com.hostelhub.backend.entity.User;

import com.hostelhub.backend.enums.AccountStatus;

import com.hostelhub.backend.exception.BadRequestException;
import com.hostelhub.backend.exception.ResourceNotFoundException;

import com.hostelhub.backend.mapper.UserMapper;

import com.hostelhub.backend.repository.UserRepository;

import com.hostelhub.backend.security.JwtService;

import com.hostelhub.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final WebClient.Builder webClientBuilder;

    @Value("${recaptcha.secret}")
    private String recaptchaSecret;


    // =========================================================
    // REGISTER
    // =========================================================

    @Override
    public AuthResponse register(
            RegisterRequest request
    ) {

        // CHECK EMAIL
        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new BadRequestException(
                    "Email already exists"
            );
        }


        // CHECK PHONE NUMBER
        if (
                userRepository.existsByPhoneNumber(
                        request.getPhoneNumber()
                )
        ) {

            throw new BadRequestException(
                    "Phone number already exists"
            );
        }


        // CREATE USER
        User user = User.builder()

                .fullName(
                        request.getFullName()
                )

                .email(
                        request.getEmail()
                )

                .phoneNumber(
                        request.getPhoneNumber()
                )

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .role(
                        request.getRole()
                )

                .gender(
                        request.getGender()
                )

                .dateOfBirth(
                        request.getDateOfBirth()
                )

                .accountStatus(
                        AccountStatus.ACTIVE
                )

                // EMAIL VERIFICATION
                // NO EMAIL OTP REQUIRED
                .emailVerified(true)

                .build();


        // SAVE USER
        User savedUser =
                userRepository.save(user);


        // GENERATE JWT TOKEN
        String token =
                jwtService.generateToken(
                        savedUser
                );


        // CONVERT USER TO RESPONSE
        UserResponse userResponse =
                UserMapper.toUserResponse(
                        savedUser
                );


        // RETURN RESPONSE
        return AuthResponse.builder()

                .token(token)

                .type("Bearer")

                .user(userResponse)

                .build();
    }


    // =========================================================
    // CAPTCHA VALIDATION
    // =========================================================

    private boolean verifyCaptcha(
            String captchaToken
    ) {

        Map response =
                webClientBuilder
                        .build()

                        .post()

                        .uri(uriBuilder ->

                                uriBuilder

                                        .scheme("https")

                                        .host("www.google.com")

                                        .path(
                                                "/recaptcha/api/siteverify"
                                        )

                                        .queryParam(
                                                "secret",
                                                recaptchaSecret
                                        )

                                        .queryParam(
                                                "response",
                                                captchaToken
                                        )

                                        .build()
                        )

                        .retrieve()

                        .bodyToMono(Map.class)

                        .block();


        System.out.println(
                "CAPTCHA RESPONSE: " +
                response
        );


        return Boolean.TRUE.equals(
                response.get("success")
        );
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @Override
    public AuthResponse login(
            LoginRequest request
    ) {

        // CAPTCHA CHECK
        boolean captchaValid =
                verifyCaptcha(
                        request.getCaptchaToken()
                );


        if (!captchaValid) {

            throw new RuntimeException(
                    "Invalid CAPTCHA"
            );
        }


        // AUTHENTICATE USER
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );


        // FIND USER
        User user =
                userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->

                        new ResourceNotFoundException(
                                "User not found"
                        )
                );


        // =====================================================
        // EMAIL VERIFICATION CHECK REMOVED
        // =====================================================
        //
        // User can now login immediately after registration.
        //
        // No:
        //
        // if (!user.isEmailVerified()) {
        //     throw new RuntimeException(
        //             "Please verify your email first"
        //     );
        // }
        //


        // GENERATE JWT
        String token =
                jwtService.generateToken(
                        user
                );


        // USER RESPONSE
        UserResponse userResponse =
                UserMapper.toUserResponse(
                        user
                );


        // RETURN LOGIN RESPONSE
        return AuthResponse.builder()

                .token(token)

                .type("Bearer")

                .user(userResponse)

                .build();
    }


    // =========================================================
    // OLD EMAIL OTP METHODS
    // =========================================================
    //
    // These methods are temporarily kept out of this class.
    //
    // We will clean the AuthService interface,
    // AuthController, OTP entity/repository,
    // and frontend OTP pages in the next steps.
    //
    // =========================================================
}