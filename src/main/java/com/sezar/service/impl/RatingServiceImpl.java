package com.sezar.service.impl;

import com.sezar.model.Rating;
import com.sezar.repository.RatingRepository;
import com.sezar.service.RatingService;
import com.sezar.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */
@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    RatingRepository ratingRepository ;

    @Autowired
    ReviewService reviewService;


    @Override
    public Rating findById(Long id) {
        return ratingRepository.findOne(id);
    }

    @Override
    public Rating findByNameOfRat(String nameOfRat) {
        return ratingRepository.findByNameOfRat(nameOfRat);
    }

    @Override
    public boolean createRating(Rating rating) {
        if(isRatinExist(rating.getNameOfRat())){
            return false;
        }
         ratingRepository.save(rating);
        return true;
    }

    @Override
    public boolean updateRating(Rating rating) {
        ratingRepository.save(rating);
        return true;
    }

    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public void deleteRating(Rating rating) {

        reviewService.deleteReviewByRating(rating);
        ratingRepository.delete(rating);
    }

    @Override
    public boolean isRatinExist(String nameOfRat) {
        Rating rating = ratingRepository.findByNameOfRat(nameOfRat);
        if( rating != null ) {return true;}
                        else {return false;}
    }
}
