package com.sezar.security.service;

import com.sezar.model.security.User;

import java.util.List;

public interface UserService {
    public void save(User user) ;
    public List<User> findAll();
    public User findByUsername(String username);
}
