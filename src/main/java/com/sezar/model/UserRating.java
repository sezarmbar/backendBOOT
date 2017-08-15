package com.sezar.model;

import javax.persistence.*;

@Entity
@Table(name = "UserRating")
public class UserRating {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String ratingName;
    private String userName;

    public UserRating(String ratingName, String userName) {
        this.ratingName = ratingName;
        this.userName = userName;
    }

    public UserRating() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRatingName() {
        return ratingName;
    }

    public void setRatingName(String ratingName) {
        this.ratingName = ratingName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}

