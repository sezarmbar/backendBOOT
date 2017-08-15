package com.sezar.security.service.impl;

import com.sezar.model.security.Authority;
import com.sezar.model.security.User;
import com.sezar.security.repository.AuthorityRepository;
import com.sezar.security.repository.UserRepository;
import com.sezar.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public boolean save(User user) {
        if(isExist(user)){
            return false;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }
    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public boolean update(User user) {
        User exist = userRepository.findOne(user.getId());
        User existByUserName = findByUsername(user.getUsername());
        if(existByUserName!=null && existByUserName.getId()!=exist.getId()){return false;}
        if(exist!= null){
            if(user.getPassword()==null){
                user.setPassword(exist.getPassword());
            }else{
                    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
            user.setId(exist.getId());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean isExist(User user){
        User exist = findByUsername(user.getUsername());
        if(exist!=null){
            return true;
        }
        return false;
    }
}
