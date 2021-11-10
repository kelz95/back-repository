package com.pineapplesupermarket.tiendaapi.controllers;

import java.security.Principal;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.services.IRoleService;
import com.pineapplesupermarket.tiendaapi.util.LoggerUtils;
//@CrossOrigin(origins= {"http://localhost:4200"})

/**
 * Controlador del Rol
 * @author Laura Saldaña
 * @version 1.0
 */
@RestController
@RequestMapping("/api/v1/roles")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleController {
	@Autowired
	private IRoleService roleService;
	@Autowired
	private IUserService userService;
	private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);

	/**
	 * End point para listar los roles
	 * 
	 * @param principal
	 * @return List<Role>
	 */
	@GetMapping("/role")
	public List<Role> index(Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "List Roles", username);
		return roleService.findAll();

	}

	/**
	 * End point para ver un rol
	 * 
	 * @param id
	 * @param principal
	 * @return
	 */
	@GetMapping("/{id}")
	public Role show(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Consult Role", username);
		return roleService.findById(id);
	}

	/**
	 * End point para crear un rol
	 * 
	 * @param role
	 * @param principal
	 * @return Role
	 */
	@PostMapping("")
	@ResponseStatus(HttpStatus.CREATED)
	public Role create(@RequestBody Role role, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Create Role", username);
		return roleService.save(role);

	}

	/**
	 * End point para actualizar un rol
	 * 
	 * @param role
	 * @param id
	 * @param principal
	 * @return Role
	 */
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Role update(@RequestBody Role role, @PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Update Role", username);
		Role roleActual = roleService.findById(id);
		roleActual.setCode(role.getCode());
		roleActual.setDescription(role.getDescription());
		return roleService.save(roleActual);
	}

	/**
	 * End point para eliminar un rol
	 * 
	 * @param id
	 * @param principal
	 */
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id, Principal principal) {
		String username = userService.getPrincipalUsername(principal);
		LoggerUtils.logRequest(logger, "Delete Role", username);
		roleService.delete(id);
	}

}
