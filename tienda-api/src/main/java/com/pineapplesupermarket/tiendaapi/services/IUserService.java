package com.pineapplesupermarket.tiendaapi.services;

import java.util.List;

import com.pineapplesupermarket.tiendaapi.models.User;

public interface IUserService {
	public List<User> findAll();
	public User save(User user);
	public void delete(Long id);
	public User findById(Long id);
}
