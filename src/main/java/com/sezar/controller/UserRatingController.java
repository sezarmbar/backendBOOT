package com.sezar.controller;

import com.sezar.model.UserRating;
import com.sezar.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RequestMapping("api")
public class UserRatingController {

    @Autowired
    UserRatingService userRatingService;


    @GetMapping("userRating")
    public ResponseEntity<List<UserRating>> getAllByUserName(@RequestParam String userName, Model model) {
        List<UserRating> userRating = userRatingService.findAllByUserName(userName);
        return new ResponseEntity<>(userRating, HttpStatus.OK);
    }

    @PostMapping("userRating")
    public ResponseEntity<Void> saveUserRating(@RequestBody UserRating userRating, UriComponentsBuilder builder){
        boolean flag = userRatingService.save(userRating);
        if(!flag){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/userRating?id={id}").buildAndExpand(userRating.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("userRating")
    public ResponseEntity<Void> deleteOne(@RequestBody UserRating userRating){
        boolean flag = userRatingService.delete(userRating);
        if(!flag){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("deleteByUserName")
    public ResponseEntity<Void> deleteByUserName(@RequestParam String userName){
        boolean flag = userRatingService.deleteByUserName(userName);
        if(!flag){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

