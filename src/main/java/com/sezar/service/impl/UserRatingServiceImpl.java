package com.sezar.service.impl;

import com.sezar.model.UserRating;
import com.sezar.repository.UserRatingRepository;
import com.sezar.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRatingServiceImpl implements UserRatingService {

    @Autowired
    UserRatingRepository userRatingRepository;

    @Override
    public List<UserRating> findAllByUserName(String userName) {
        return userRatingRepository.findAllByUserName(userName);
    }

    @Override
    public boolean save(UserRating userRating) {
        userRatingRepository.save(userRating);
        return true;
    }

    @Override
    public boolean delete(UserRating userRating) {
        userRatingRepository.delete(userRating);
        return true;
    }

    @Override
    public boolean deleteByUserName(String userName) {
        userRatingRepository.deleteByUserName(userName);
        return true;
    }

    @Override
    public List<String> findRatingNames(String userName) {
        if(userRatingRepository.findRatingNames(userName)!= null)
            return userRatingRepository.findRatingNames(userName);
        return null;
    }
}
