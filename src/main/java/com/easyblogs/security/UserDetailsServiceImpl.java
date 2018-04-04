package com.easyblogs.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.easyblogs.model.User;
import com.easyblogs.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
    private UserRepository userRepository;
	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("username not found:" + username);
        }

        return user;
    }

	public Optional<User> getUser(Long id) {
		// TODO Auto-generated method stub
		return this.userRepository.findById(id);
	}

	public void login(String username, String password) {
		// TODO Auto-generated method stub
		
	}

	public User authenticate(String username, String password) {
		User user = null;
		try {
			user = this.userRepository.findByUsername(username);
			if((user.getPassword().equals(password))) {
				return user;
			}
		}catch(Exception ex) {
			System.out.println(ex);
		}
		return null;
	}
}
