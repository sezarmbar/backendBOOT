package com.sezar.repository;

import com.sezar.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */
@Repository
public interface RatingRepository extends CrudRepository<Rating, Long> {
    Rating findByNameOfRat(String nameOfRat);

    @Query("SELECT r FROM Rating r WHERE  r.nameOfRat in :listNameOfRat")
    List<Rating> findthis(@Param("listNameOfRat")List<String> listNameOfRat);

}
