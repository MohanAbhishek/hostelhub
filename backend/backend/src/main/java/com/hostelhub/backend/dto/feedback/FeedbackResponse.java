package com.hostelhub.backend.dto.feedback;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FeedbackResponse {

    private Long id;

    private String name;

    private String email;

    private String message;

    private LocalDateTime createdAt;
}