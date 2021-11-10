package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
	
	Page<User> findAll(Pageable pageable);

	Optional<User> findByUsername(String username);
	 
	Optional<User> findByEmail(String username);
	 
	Optional<User> findByIdUserAndActivo(long id, boolean activo);
	 
	Optional<User> findByUsernameOrEmail(String username, String email);

	

}
