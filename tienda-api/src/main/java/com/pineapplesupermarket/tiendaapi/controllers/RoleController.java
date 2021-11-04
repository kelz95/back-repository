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

import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.services.RoleService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class RoleController {
	@Autowired
	private RoleService roleService;
	@GetMapping("/role")
	public List<Role> index(){
		return roleService.findAll();
		
	}
	
	@GetMapping("/role/{id}")
	public Role show(@PathVariable Long id) {
		return roleService.findById(id);
	}
	@PostMapping("/role")
	@ResponseStatus(HttpStatus.CREATED)
	public Role create(@RequestBody Role role) {
		return roleService.save(role);
	}
	
	@PutMapping("/role/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Role update (@RequestBody Role role, @PathVariable Long id) {
	Role roleActual = roleService.findById(id);
		roleActual.setCode(role.getCode());
		roleActual.setDescription(role.getDescription());
	return roleService.save(roleActual);
	}
	
	@DeleteMapping("/role/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		roleService.delete(id);
	}
	
	
}
