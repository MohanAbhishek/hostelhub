package com.hostelhub.backend.controller;

import com.hostelhub.backend.dto.feedback.FeedbackRequest;
import com.hostelhub.backend.dto.feedback.FeedbackResponse;
import com.hostelhub.backend.service.FeedbackService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // SUBMIT FEEDBACK

    @PostMapping
    public FeedbackResponse submitFeedback(
            @Valid @RequestBody
            FeedbackRequest request
    ) {

        return feedbackService
                .submitFeedback(request);
    }

    // ADMIN VIEW ALL FEEDBACKS

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<FeedbackResponse>
    getAllFeedbacks() {

        return feedbackService
                .getAllFeedbacks();
    }
}