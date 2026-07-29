package com.hostelhub.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/landlord")
public class LandlordController {

    @GetMapping("/dashboard")
    public String landlordDashboard() {

        return "Welcome Landlord";
    }
}