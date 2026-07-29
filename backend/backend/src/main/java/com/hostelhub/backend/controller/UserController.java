package com.hostelhub.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.hostelhub.backend.entity.User;
import com.hostelhub.backend.service.UserService;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getUsers() {
        return service.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return service.saveUser(user);
    }

   
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable UUID id,
            @RequestBody User user
    ) {
        return service.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        service.deleteUser(id);
    }
}