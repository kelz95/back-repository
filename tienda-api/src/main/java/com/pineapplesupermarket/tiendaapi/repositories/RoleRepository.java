package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pineapplesupermarket.tiendaapi.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long>  {
 public List<Role> findAll();
}
