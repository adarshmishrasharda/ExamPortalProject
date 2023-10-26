package com.exam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.exam.service.impl.UserDetailsServiceImple;

/**
 * @author adarshmishra
 * @EnableWebSecurity-
 *@Configuration-it tell spring boot that this class is configuration class
 *@EnableGlobalMethodSecurity-this annotation is needed when we need to identify roles
 *WebSecurityConfigurerAdapter-In this class we have some default security configuration if we want  to customiz it we need to extend this and override those methods;
 */

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MySecurityConfig  extends WebSecurityConfigurerAdapter{

	
	@Autowired
	private UserDetailsServiceImple userDetailsServiceImple;
	
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		// TODO Auto-generated method stub
		return super.authenticationManagerBean();
	}
	
	//we have to use Bcrypt password encoder only 
	//but for testing purpose we are using password encoder and NoOpPassword Encodeer in return type
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	/**
	 * @author adarshmishra
	 *This method tells us that which type of authemtication we want to do
	 *1.In-memory auth
	 *2.DataBase auth
	 *3.File based
	 *
	 *Because we have following method so we have to add BCryptPasswordEncoder now.
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.userDetailsServiceImple).passwordEncoder(passwordEncoder());
		
	}
	
	/*
	 * Now we need to configure following method
	 * In this method we are going to tell that which end points we are going to use
	 * which end point are public e.t.c
	 * 
	 * */
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		System.out.println("going to check security");
		http
		.csrf()
		.disable()
		.cors()
		.disable()
		.authorizeRequests()
		.antMatchers("/generate-token","/user/").permitAll()
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.anyRequest().authenticated()
		.and()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		
	
	}
	 
	
}
