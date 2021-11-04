package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
	 public List<User> findAll();
}
