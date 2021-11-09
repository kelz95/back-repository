package com.pineapplesupermarket.tiendaapi.services;

import java.security.Principal;
import java.util.List;

import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface IUserService {
	public List<User> findAll();
	public User save(User user) throws DuplicateEntryException;
	public User update(Long id, User user) throws DuplicateEntryException, EntityNotFoundException;
	public void delete(Long id) throws EntityNotFoundException;
	public User findById(Long id);
	public String getPrincipalUsername(Principal principal);
}
