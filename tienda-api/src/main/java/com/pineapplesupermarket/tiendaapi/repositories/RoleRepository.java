package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pineapplesupermarket.tiendaapi.models.Role;
/**
 *Repositorio del rol
 *@author Laura Saldaña
 *@version 1.0
 */
public interface RoleRepository extends JpaRepository<Role, Long>  {

	Optional<Role> findByCode(String code);
}
