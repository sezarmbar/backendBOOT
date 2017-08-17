package com.sezar.security.service;

import com.sezar.model.security.User;

import java.util.List;

public interface UserService {
    public boolean save(User user) ;
    public List<User> findAll();
    public User findByUsername(String username);
    public boolean update(User user);
    public boolean delete(User user);
}
