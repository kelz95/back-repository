package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
	 public List<User> findAll();
	 
	 Optional<User> findByUsername(String username);
	 
	 Optional<User> findByEmail(String username);
	 
	 Optional<User> findByIdUserAndActivo(long id, boolean activo);

}
