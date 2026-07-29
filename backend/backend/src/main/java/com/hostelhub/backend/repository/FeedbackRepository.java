package com.hostelhub.backend.repository;

import com.hostelhub.backend.entity.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {
}