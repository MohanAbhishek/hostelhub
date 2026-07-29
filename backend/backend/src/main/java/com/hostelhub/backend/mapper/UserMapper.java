package com.hostelhub.backend.mapper;

import com.hostelhub.backend.dto.auth.UserResponse;
import com.hostelhub.backend.entity.User;

public class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toUserResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }
}