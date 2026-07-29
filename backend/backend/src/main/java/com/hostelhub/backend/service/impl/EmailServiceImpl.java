package com.hostelhub.backend.service.impl;

import com.hostelhub.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl
        implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(
            String to,
            String otp
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(to);

        message.setSubject(
                "HostelHub Email Verification OTP"
        );

        message.setText(
                "Welcome to HostelHub!\n\n" +
                "Your OTP is: " + otp +
                "\n\nValid for 5 minutes."
        );

        mailSender.send(message);
    }
    @Override
    public void sendVerificationSuccessEmail(
            String toEmail
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "HostelHub Account Verified ✅"
        );

        message.setText(
                "Hello,\n\n" +

                "Your HostelHub account has been successfully verified.\n\n" +

                "You can now login and access all platform features.\n\n" +

                "Welcome to HostelHub 🎉\n\n" +

                "Regards,\n" +

                "HostelHub Team\n"+
                "From SAI CHARAN and BIKSHUUUU"
        );

        mailSender.send(message);
    }
    
    
    
}