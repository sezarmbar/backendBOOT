package com.sezar.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sezar.model.security.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by stephan on 20.03.16.
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
//    void
}
