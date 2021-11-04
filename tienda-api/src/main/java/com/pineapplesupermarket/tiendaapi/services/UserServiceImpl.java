package com.pineapplesupermarket.tiendaapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.repositories.UserRepository;

public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Override
	@Transactional(readOnly=true)
	public List<User> findAll() {
		return (List<User>) userRepository.findAll();
	}

}
