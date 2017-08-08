package com.sezar.repository;

import com.sezar.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByNameOfRat(String nameOfRat);


}
