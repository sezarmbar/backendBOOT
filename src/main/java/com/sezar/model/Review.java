package com.sezar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by mahmoudbarakat on 21.07.17.
 */

@Entity
public class Review implements Serializable {

    private static final long serialVersionUID = 19051221950251237L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Lob
    private String reviewText;

    @ManyToOne(fetch = FetchType.LAZY)
//    @ManyToOne
    @JoinColumn(name = "rating_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Rating rating;

    public Review() {
    }

    public Review(String reviewText, Rating rating) {
        this.reviewText = reviewText;
        this.rating = rating;
    }

    public String getReview() {
        return reviewText;
    }

    public void setReview(String review) {
        this.reviewText = review;
    }


    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public Long getReviewId() {
        return id;
    }

    public void setReviewId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewId=" + id +
                ", review='" + reviewText + '\'' +
                ", rating=" + rating +
                '}';
    }
}
