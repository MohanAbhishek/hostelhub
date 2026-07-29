package com.hostelhub.backend.service;

import com.hostelhub.backend.dto.feedback.FeedbackRequest;
import com.hostelhub.backend.dto.feedback.FeedbackResponse;

import java.util.List;

public interface FeedbackService {

    FeedbackResponse submitFeedback(
            FeedbackRequest request
    );

    List<FeedbackResponse> getAllFeedbacks();
}