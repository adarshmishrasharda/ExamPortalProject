package com.exam.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.exam.models.User;
import com.exam.repo.UserRepository;

/**
 * @author adarshmishra
 * 
 * This is class which is related to spring security
 * spring security is going to call this because this class going to implements UserDetailsService interface is going to provide a method called as loadUserByUserName. 
 *
 */

@Service
public class UserDetailsServiceImple implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = this.userRepository.findByUsername(username);
		if(user==null)
		{
			System.out.println("user not found");
			throw new UsernameNotFoundException("No user found with this user name");
		}
		
		
		return user;
	}
	

	
	
}
