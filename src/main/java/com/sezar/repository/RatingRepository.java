package com.sezar.repository;

import com.sezar.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by mahmoudbarakat on 20.07.17.
 */
@Repository
public interface RatingRepository extends CrudRepository<Rating, Long> {
    Rating findByNameOfRat(String nameOfRat);

    @Query("SELECT r FROM Rating r WHERE  r.nameOfRat in :listNameOfRat")
    List<Rating> findthis(@Param("listNameOfRat")List<String> listNameOfRat);

    @Modifying
    @Transactional
    @Query("UPDATE Rating r SET r.bad=(:bad), r.veryBad=(:veryBad),r.normal=(:normal),r.god=(:god),r.veryGod=(:veryGod)")
    void update(@Param("veryBad") int veryBad,@Param("bad") int bad,@Param("normal") int normal,@Param("god") int god,@Param("veryGod") int veryGod);

    @Modifying
    @Transactional
    @Query("UPDATE Rating r SET r.description=(:description), r.active=(:active),r.waitingTime =(:waitingTime)")
    void updateInfo(@Param("description") String description,@Param("active") boolean active,@Param("waitingTime") float waitingTime);
}
