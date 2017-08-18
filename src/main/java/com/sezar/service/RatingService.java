package com.sezar.service;

import com.sezar.model.Rating;

import java.util.List;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */


public interface RatingService {
    Rating findById(Long id);
    Rating findByNameOfRat(String nameOfRat);
    boolean isRatinExist(String nameOfRat);
    boolean createRating(Rating rating);
    boolean updateRating(Rating rating);
    List<Rating> findAll();
    void deleteRating(Rating rating);
    List<Rating> findthis(List<String> listNameOfRat);
    boolean updateSomeField(Rating rating);
    boolean updateInfoField(Rating rating);

}
