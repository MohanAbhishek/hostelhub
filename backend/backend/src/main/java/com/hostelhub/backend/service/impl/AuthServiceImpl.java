package com.hostelhub.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

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

import com.hostelhub.backend.entity.OtpVerification;
import com.hostelhub.backend.entity.User;

import com.hostelhub.backend.enums.AccountStatus;

import com.hostelhub.backend.exception.BadRequestException;
import com.hostelhub.backend.exception.ResourceNotFoundException;

import com.hostelhub.backend.mapper.UserMapper;

import com.hostelhub.backend.repository.OtpVerificationRepository;
import com.hostelhub.backend.repository.UserRepository;

import com.hostelhub.backend.security.JwtService;

import com.hostelhub.backend.service.AuthService;
import com.hostelhub.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final OtpVerificationRepository otpRepository;

    private final EmailService emailService;

    private final WebClient.Builder webClientBuilder;

    @Value("${recaptcha.secret}")
    private String recaptchaSecret;

    @Override
    public AuthResponse register(
            RegisterRequest request
    ) {

        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new BadRequestException(
                    "Email already exists"
            );
        }

        if (
                userRepository.existsByPhoneNumber(
                        request.getPhoneNumber()
                )
        ) {

            throw new BadRequestException(
                    "Phone number already exists"
            );
        }

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

                .emailVerified(false)

                .build();

        User savedUser =
                userRepository.save(user);

        // GENERATE OTP

        String otp =
                String.valueOf(
                        100000 +
                        new Random().nextInt(900000)
                );

        // SAVE OTP

        OtpVerification otpVerification =
                OtpVerification.builder()

                        .email(
                                savedUser.getEmail()
                        )

                        .otp(otp)

                        .expiryTime(
                                LocalDateTime.now()
                                        .plusMinutes(5)
                        )

                        .verified(false)

                        .build();

        otpRepository.save(
                otpVerification
        );

        // SEND OTP EMAIL

        emailService.sendOtpEmail(
                savedUser.getEmail(),
                otp
        );

        String token =
                jwtService.generateToken(
                        savedUser
                );

        UserResponse userResponse =
                UserMapper.toUserResponse(
                        savedUser
                );

        return AuthResponse.builder()

                .token(token)

                .type("Bearer")

                .user(userResponse)

                .build();
    }

    // CAPTCHA VALIDATION

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

                                        .path("/recaptcha/api/siteverify")

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

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->

                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        // EMAIL VERIFICATION CHECK

        if (!user.isEmailVerified()) {

            throw new RuntimeException(
                    "Please verify your email first"
            );
        }

        String token =
                jwtService.generateToken(
                        user
                );

        UserResponse userResponse =
                UserMapper.toUserResponse(
                        user
                );

        return AuthResponse.builder()

                .token(token)

                .type("Bearer")

                .user(userResponse)

                .build();
    }

    @Override
    public void verifyOtp(
            String email,
            String otp
    ) {

        OtpVerification otpData =
                otpRepository
                        .findTopByEmailOrderByIdDesc(
                                email
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        // INVALID OTP

        if (
                !otpData.getOtp().equals(otp)
        ) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // EXPIRED OTP

        if (
                otpData.getExpiryTime()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            throw new RuntimeException(
                    "OTP expired"
            );
        }

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User not found"
                                )
                        );

        user.setEmailVerified(true);

        userRepository.save(user);
        
        emailService.sendVerificationSuccessEmail(
                user.getEmail()
        );

        otpData.setVerified(true);

        otpRepository.save(otpData);
    }

    @Override
    public void sendForgotPasswordOtp(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );

        String otp =
                String.valueOf(
                        100000 +
                        new Random().nextInt(900000)
                );

        OtpVerification otpVerification =
                OtpVerification.builder()

                        .email(email)

                        .otp(otp)

                        .verified(false)

                        .expiryTime(
                                LocalDateTime.now()
                                        .plusMinutes(5)
                        )

                        .build();

        otpRepository.save(
                otpVerification
        );

        emailService.sendOtpEmail(
                user.getEmail(),
                otp
        );
    }

    @Override
    public void resetPassword(
            String email,
            String otp,
            String newPassword
    ) {

        OtpVerification otpData =
                otpRepository
                        .findTopByEmailOrderByIdDesc(
                                email
                        )
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        // INVALID OTP

        if (
                !otpData.getOtp().equals(otp)
        ) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // EXPIRED OTP

        if (
                otpData.getExpiryTime()
                        .isBefore(
                                LocalDateTime.now()
                        )
        ) {

            throw new RuntimeException(
                    "OTP expired"
            );
        }

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->

                                new RuntimeException(
                                        "User not found"
                                )
                        );

        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        userRepository.save(user);

        otpData.setVerified(true);

        otpRepository.save(otpData);
    }
}