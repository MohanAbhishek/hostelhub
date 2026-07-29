package com.hostelhub.backend.service;

public interface EmailService {

    void sendOtpEmail(
            String to,
            String otp
    );
    
    void sendVerificationSuccessEmail(
            String toEmail
    );
}