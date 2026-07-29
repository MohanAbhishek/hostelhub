package com.hostelhub.backend.service;

import org.springframework.stereotype.Service;

import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.repository.UserRepository;

import java.util.List;
import java.util.UUID;
@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User saveUser(User user) {
        return repository.save(user);
    }

    public User updateUser(UUID id, User updatedUser){

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());

        return repository.save(user);
    }
    public void deleteUser(UUID id) {
        repository.deleteById(id);
    }
}