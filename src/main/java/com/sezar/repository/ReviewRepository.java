package com.sezar.repository;

import com.sezar.model.Rating;
import com.sezar.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by mahmoudbarakat on 21.07.17.
 */
@Transactional
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findAllByRating(Rating rating);


    @Query("SELECT  r.reviewText FROM Review r  WHERE r.rating = (:rating)")
    List<Review> findAllByRatingLazy(@Param("rating") Rating rating);

    @Modifying
    @Transactional
    @Query("DELETE FROM Review r WHERE r.rating =(:rating) ")
    void deleteReviewByRating(@Param("rating") Rating rating);
}
