package com.sezar.service.impl;

import com.sezar.model.Rating;
import com.sezar.model.Review;
import com.sezar.repository.ReviewRepository;
import com.sezar.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mahmoudbarakat on 21.07.17.
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public boolean createReview(Review review) {
        reviewRepository.save(review);
        return true;
    }
    @Override
    public  List<Review> findAllByRating(Rating rating){return reviewRepository.findAllByRating(rating);}

    @Override
    public List<Review> findAllByRatingLazy(Rating rating) {
        return  reviewRepository.findAllByRatingLazy(rating);
    }

    @Override
    public void deleteReviewByRating(Rating rating) {
        reviewRepository.deleteReviewByRating(rating);
    }

}
