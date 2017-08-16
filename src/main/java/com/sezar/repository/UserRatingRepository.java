package com.sezar.repository;

import com.sezar.model.Review;
import com.sezar.model.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

public interface UserRatingRepository extends CrudRepository<UserRating ,Long> {

    List<UserRating> findAllByUserName(String userName);

    void deleteByUserName(String userName);

    @Query("SELECT ur.ratingName FROM UserRating ur WHERE  ur.userName = :userName")
    List<String> findRatingNames(@Param("userName") String userName);
}
