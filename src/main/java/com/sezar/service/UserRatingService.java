package com.sezar.service;

import com.sezar.model.UserRating;

import java.util.List;

public interface UserRatingService {
    public List<UserRating> findAllByUserName(String userName);
    public boolean save(UserRating userRating);
    public boolean delete(UserRating userRating);
    public boolean deleteByUserName(String userName);
    public List<String> findRatingNames(String userName);
}
