package com.sezar.security.controller;

import com.sezar.model.Rating;
import com.sezar.model.security.Authority;
import com.sezar.model.security.AuthorityName;
import com.sezar.model.security.User;
import com.sezar.security.JwtTokenUtil;
import com.sezar.security.service.UserService;
import org.json.JSONML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.sezar.security.JwtUser;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
public class UserRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "user", method = RequestMethod.GET)
    public JwtUser getAuthenticatedUser(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);
        return user;
    }
    @PostMapping("/registration")
    public  ResponseEntity<Void> createNewUser(@RequestBody User user, UriComponentsBuilder builder){
        boolean flag = userService.save(user);
        if(!flag){
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/user?id={id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public  ResponseEntity<Void> updateUser(@RequestBody User user, UriComponentsBuilder builder){
        boolean flag = userService.update(user);
        if(!flag){
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }


    @GetMapping("all-User")
    public ResponseEntity<List<User>> getAllArticles() {
        List<User> list = userService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    public ResponseEntity<Void> updateUser(@RequestBody User user){
//        userService.save();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
