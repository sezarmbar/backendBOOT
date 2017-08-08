package com.sezar.service;

import com.sezar.model.Rating;

import java.util.List;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */


public interface RatingService {
    public Rating findById(Long id);
    public Rating findByNameOfRat(String nameOfRat);
    public boolean isRatinExist(String nameOfRat);
    boolean createRating(Rating rating);
    boolean updateRating(Rating rating);
    public List<Rating> findAll();
    void deleteRating(Rating rating);

}
