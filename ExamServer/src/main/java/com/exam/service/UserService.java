package com.exam.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.models.User;
import com.exam.models.UserRole;

@Service
public interface UserService {
	
	//create user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	//get user by username
	public User getUser(String username);
	
	//detele user by id
	public void deleteUser(Long id);
}
