package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.repositories.RoleRepository;
import com.pineapplesupermarket.tiendaapi.services.IRoleService;
/**
 *Implementación del servicio del rol
 *@author Laura Saldaña 
 *@version 1.0
 */
@Service
public class RoleServiceImpl implements IRoleService{
	@Autowired
	private RoleRepository roleRepository;
	/**
	 * Método para encontrar los roles
	 * @return List<Role>
	 *
	 */
	@Override
	@Transactional(readOnly=true)
	public List<Role> findAll() {
		return (List<Role>) roleRepository.findAll();
	}
	/**
	 * Método para guardar un rol
	 * @param role
	 * @return List<Role>
	 *
	 */
	@Transactional
	@Override
	public Role save(Role role) {
		return roleRepository.save(role);
	}
	/**
	 * Método para eliminar un rol
	 * @param id
	 * @return List<Role>
	 *
	 */
	@Transactional
	@Override
	public void delete(Long id) {

		roleRepository.deleteById(id);
	}
	/**
	 * Método para encontrar un rol
	 * @param id
	 * @return List<Role>
	 *
	 */
	@Transactional(readOnly=true)
	@Override
	public Role findById(Long id) {
		return roleRepository.findById(id).orElse(null);
	}

}
