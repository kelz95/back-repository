package com.pineapplesupermarket.tiendaapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.pineapplesupermarket.tiendaapi.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long>  {

	Role findByCode(String code);
}
