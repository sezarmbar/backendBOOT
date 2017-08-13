package com.sezar.repository;

import com.sezar.model.Review;
import com.sezar.model.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

public interface UserRatingRepository extends JpaRepository<UserRating ,Long>{


    @Query("SELECT  ur.ratingName FROM user_rating ur  WHERE ur.userName = (:userName)")
    List<UserRating> findAllByRatingLazy(@Param("userRating") String userName);

}
