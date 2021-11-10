package com.pineapplesupermarket.tiendaapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface RestoreCodeRepository extends JpaRepository<RestoreCode, Long> {

	Optional<RestoreCode> findByCodeAndUser(String code, User user);
}
