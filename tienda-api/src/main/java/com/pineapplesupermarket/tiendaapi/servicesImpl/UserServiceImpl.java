package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.repositories.UserRepository;
import com.pineapplesupermarket.tiendaapi.services.IUserService;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository userRepository;
	@Override
	@Transactional(readOnly=true)
	public List<User> findAll() {
		return (List<User>) userRepository.findAll();
	}
	@Transactional
	@Override
	public User save(User user) {
		return userRepository.save(user);
	}
	@Transactional
	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}
	@Transactional(readOnly=true)
	@Override
	public User findById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

}
