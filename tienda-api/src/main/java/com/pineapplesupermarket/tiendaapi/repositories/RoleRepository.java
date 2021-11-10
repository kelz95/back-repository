package com.pineapplesupermarket.tiendaapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.pineapplesupermarket.tiendaapi.models.Role;
/**
 *Repositorio del rol
 *@author Laura Saldaña
 *@version 1.0
 */
public interface RoleRepository extends CrudRepository<Role, Long>  {

	Role findByCode(String code);
}
