package com.pineapplesupermarket.tiendaapi.services;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface IUserService {
	
	public Page<User> findAll(Pageable pageable);
	
	public User save(User user) throws DuplicateEntryException;
	
	public User update(Long id, User user) throws DuplicateEntryException, EntityNotFoundException;
	
	public void delete(Long id) throws EntityNotFoundException;
	
	public User findById(Long id) throws EntityNotFoundException;
	
	public String getPrincipalUsername(Principal principal);
	
	public ResponseDTO sendRestoreCode(String parametro) throws EntityNotFoundException;	
	
	public ResponseDTO restorePasswordUser(String username, String password, String code) throws EntityNotFoundException;	
	
}
