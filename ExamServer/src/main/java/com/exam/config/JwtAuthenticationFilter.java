package com.exam.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exam.service.impl.UserDetailsServiceImple;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImple userDetailsServiceImple;
	
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		
		final String requestTokenHeader = request.getHeader("Authorization");
		
		System.out.println(requestTokenHeader);
		
		String username=null;
		String jwttoken=null;
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer"))
		{
			try {
				jwttoken=requestTokenHeader.substring(7);
				username=this.jwtUtil.extractUsername(jwttoken);
				
			}catch(ExpiredJwtException e)
			{
				e.printStackTrace();
				System.out.println("jwt token expired ");
				
			}
			catch(Exception e)
			{
				e.printStackTrace();
				System.out.println("error we got");
			}
			
		}
		else
		{
			System.out.println("Invalid token not start with bearer");
		}
		
		//validate token
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			final UserDetails userdetails = this.userDetailsServiceImple.loadUserByUsername(username);
			
			if(this.jwtUtil.validateToken(jwttoken, userdetails))
			{
				//token is valid
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationtoken = new UsernamePasswordAuthenticationToken(userdetails,null,userdetails.getAuthorities());
				
				usernamePasswordAuthenticationtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationtoken);
			}
		}
		
		else
		{
			System.out.println("token is not valid");
		}
		
		filterChain.doFilter(request, response);
		
		
	}
	
	

}
