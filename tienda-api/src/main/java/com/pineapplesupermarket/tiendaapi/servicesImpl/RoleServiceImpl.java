package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.repositories.RoleRepository;
import com.pineapplesupermarket.tiendaapi.services.IRoleService;
@Service
public class RoleServiceImpl implements IRoleService{
	@Autowired
	private RoleRepository roleRepository;
	@Override
	@Transactional(readOnly=true)
	public List<Role> findAll() {
		return (List<Role>) roleRepository.findAll();
	}
	@Transactional
	@Override
	public Role save(Role role) {
		return roleRepository.save(role);
	}
	@Transactional
	@Override
	public void delete(Long id) {
		roleRepository.deleteById(id);
	}
	@Transactional(readOnly=true)
	@Override
	public Role findById(Long id) {
		return roleRepository.findById(id).orElse(null);
	}

}
