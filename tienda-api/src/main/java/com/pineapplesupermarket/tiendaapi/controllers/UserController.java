package com.pineapplesupermarket.tiendaapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.services.UserService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserService userService;
	@GetMapping("/user")
	public List<User> index(){
		return userService.findAll();
		
	}
	@GetMapping("/user/{id}")
	public User show (@PathVariable Long id) {
		return userService.findById(id);
	}
	@PostMapping("/user")
	@ResponseStatus(HttpStatus.CREATED)
	public User create(@RequestBody User user) {
		return userService.save(user);
	}
	@PutMapping("/user/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public User update(@RequestBody User user, @PathVariable Long id) {
		User userActual = userService.findById(id);
		userActual.setEmail(user.getEmail());
		userActual.setLastName(user.getLastname());
		userActual.setName(user.getName());
		userActual.setPassword(user.getPassword());
		userActual.setRole(user.getRole());
		userActual.setActivo(user.getActivo());
		return userService.save(userActual);
	}
	@DeleteMapping("/user/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		userService.delete(id);
	}
}
