package com.easyblogs.controller;

import java.security.Principal;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.easyblogs.model.User;
import com.easyblogs.repository.UserRepository;
import com.easyblogs.security.UserDetailsServiceImpl;

@RestController
@RequestMapping( value = "/users")
public class UserController {
	
	@Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDetailsServiceImpl userService;
	
	@Autowired
	  AuthenticationManager authenticationManager;


	@RequestMapping("/{id}")
	public Optional<User> getUser(@PathVariable Long id) {
		return userService.getUser(id);
	}
	 @RequestMapping(method = RequestMethod.POST, value = "/login")
	  public ResponseEntity<?> authenticate(@RequestBody UserCredentialsRequest userCredentialsRequest)
	  {

			Map<String, Object> response = new HashMap<>();
		 
	    User user = this.userService.authenticate(userCredentialsRequest.username, userCredentialsRequest.password);
	    
	    if (user!=null) {
            String cred = userCredentialsRequest.username+":"+userCredentialsRequest.password;
            String token = new String(Base64.getEncoder().encode(cred.getBytes()));
			response.put("result", "success");
			response.put("user", user);
			response.put("token", token);
            return ResponseEntity.accepted().body(response);
        }

		response.put("result", "failure");
		return ResponseEntity.badRequest().body(response);
	  }
	
	@RequestMapping("/whoami")
    public User user(Principal user) {
        return (User) this.userService.loadUserByUsername(user.getName());
    }
	static class UserCredentialsRequest {
		public String username;
		public String password;
	}
}
