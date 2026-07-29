package com.hostelhub.backend.service.impl;

import com.hostelhub.backend.dto.feedback.FeedbackRequest;
import com.hostelhub.backend.dto.feedback.FeedbackResponse;
import com.hostelhub.backend.entity.Feedback;
import com.hostelhub.backend.repository.FeedbackRepository;
import com.hostelhub.backend.service.FeedbackService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl
        implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Override
    public FeedbackResponse submitFeedback(
            FeedbackRequest request
    ) {

        Feedback feedback =
                Feedback.builder()

                        .name(request.getName())

                        .email(request.getEmail())

                        .message(request.getMessage())

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .build();

        Feedback savedFeedback =
                feedbackRepository.save(feedback);

        return mapToResponse(savedFeedback);
    }

    @Override
    public List<FeedbackResponse>
    getAllFeedbacks() {

        return feedbackRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FeedbackResponse
    mapToResponse(
            Feedback feedback
    ) {

        return FeedbackResponse.builder()

                .id(feedback.getId())

                .name(feedback.getName())

                .email(feedback.getEmail())

                .message(feedback.getMessage())

                .createdAt(
                        feedback.getCreatedAt()
                )

                .build();
    }
}