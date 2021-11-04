package com.pineapplesupermarket.tiendaapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.services.RoleService;

@RestController
@RequestMapping("/api")
public class RoleController {
	@Autowired
	private RoleService roleService;
	@GetMapping("/role")
	public List<Role> index(){
		return roleService.findAll();
		
	}
}
