package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.security.Principal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.repositories.RoleRepository;
import com.pineapplesupermarket.tiendaapi.repositories.UserRepository;
import com.pineapplesupermarket.tiendaapi.security.UserPrincipal;
import com.pineapplesupermarket.tiendaapi.services.IUserService;

@Service
public class UserServiceImpl implements IUserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private static final String ENTITY_NAME = "User";
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	@Transactional(readOnly=true)
	public List<User> findAll() {
		return (List<User>) userRepository.findAll();
	}
	
	@Transactional
	@Override
	public User save(User user) throws DuplicateEntryException {
		User usuarioNameExistente = this.userRepository.findByUsername(user.getUsername()).orElse(null);
		User usuarioEmailExistente = this.userRepository.findByEmail(user.getEmail()).orElse(null);

		if(usuarioNameExistente == null && usuarioEmailExistente == null) {
			Role role = this.roleRepository.findByCode(user.getRole().getCode());
			user.setActivo(true);
			user.setRole(role);
			String password = user.getPassword();
			user.setPassword(this.bCryptPasswordEncoder.encode(password));
		}else {
			StringBuilder duplicateParameters = new StringBuilder();
			duplicateParameters.append(usuarioNameExistente != null ? "username" : "email");
			throw new DuplicateEntryException(ENTITY_NAME, duplicateParameters.toString(), 
					(usuarioNameExistente != null ? user.getUsername() : user.getEmail()));
		
		}
		return userRepository.save(user);
	}
	
	@Transactional
	@Override
	public User update(Long id, User user) throws DuplicateEntryException, EntityNotFoundException {
		User userActual = this.userRepository.findById(id).orElse(null);
		if(userActual != null) {
			if(!userActual.getUsername().equals(user.getUsername())) {
				User usuarioNameExistente = this.userRepository.findByUsername(user.getUsername()).orElse(null);
				if(usuarioNameExistente == null) {
					userActual.setUsername(user.getUsername());
				}else {
					throw new DuplicateEntryException(ENTITY_NAME, "username", user.getUsername());	
				}
			}
			
			if(!userActual.getUsername().equals(user.getUsername())) {
				User usuarioEmailExistente = this.userRepository.findByEmail(user.getEmail()).orElse(null);
				if(usuarioEmailExistente == null) {
					userActual.setEmail(user.getEmail());
				}else {
					throw new DuplicateEntryException(ENTITY_NAME, "email", user.getEmail());	
				}
			}
			
			Role role = this.roleRepository.findByCode(user.getRole().getCode());
			
			userActual.setLastName(user.getLastname());
			userActual.setName(user.getName());
			userActual.setRole(role);
			userActual.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
		logger.info("Updated user " + user.getUsername());
		return userRepository.save(user);
	}
	
	@Transactional
	@Override
	public void delete(Long id) throws EntityNotFoundException {
		User usuario = this.userRepository.findById(id).orElse(null);
		if(usuario != null) {
			usuario.setActivo(false);
			userRepository.save(usuario);
			logger.info("Deleted user " + usuario.getUsername());
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
//		userRepository.deleteById(id);
	}
	
	@Transactional(readOnly=true)
	@Override
	public User findById(Long id) {
		return userRepository.findByIdUserAndActivo(id, true).orElse(null);
	}
	
	@Override
	public String getPrincipalUsername(Principal principal) {
		String username = null;
		if(principal instanceof UsernamePasswordAuthenticationToken) {
			logger.info("Instace of usernamePasswordAuth");
			username = ((UserPrincipal) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUsername();
		} else {
			logger.info("Not instace of usernamePasswordAuth");
			username = principal.getName();
		}
		logger.info("Username: " + username);
		return username;
	}

}
