package com.pineapplesupermarket.tiendaapi.services;

import java.util.List;

import com.pineapplesupermarket.tiendaapi.models.Role;

public interface RoleService {
	 public List<Role> findAll();
	 public Role save(Role role);
	 public void delete(Long id);
	 public Role findById(Long id);
}
