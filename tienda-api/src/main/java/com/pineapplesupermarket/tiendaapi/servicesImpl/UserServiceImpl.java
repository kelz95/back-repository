package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.pineapplesupermarket.tiendaapi.dto.ResponseDTO;
import com.pineapplesupermarket.tiendaapi.enums.ResponseCodeEnum;
import com.pineapplesupermarket.tiendaapi.exception.DuplicateEntryException;
import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.models.Role;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.repositories.RoleRepository;
import com.pineapplesupermarket.tiendaapi.repositories.UserRepository;
import com.pineapplesupermarket.tiendaapi.security.UserPrincipal;
import com.pineapplesupermarket.tiendaapi.services.IEmailService;
import com.pineapplesupermarket.tiendaapi.services.IRestoreCodeService;
import com.pineapplesupermarket.tiendaapi.services.IUserService;
import com.pineapplesupermarket.tiendaapi.util.LoggerUtils;
/**
 *Implementación del servicio del usuario
 *@author Laura Saldaña 
 *@version 1.0
 */
@Service
public class UserServiceImpl implements IUserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private static final String ENTITY_NAME = "User";
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private IRestoreCodeService restoreCodeService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private IEmailService emailService;
	
	/** Método para encontrar los usuarios
	 *@param pageable
	 *@return Page<User>
	 */
	@Override
	@Transactional(readOnly=true)
	public Page<User> findAll(Pageable pageable) {
		return this.userRepository.findAll(pageable);
	}
	
	/** Método para guardar los usuarios
	 *@param User
	 *@return User
	 *@exception DuplicateEntryException
	 * @throws EntityNotFoundException 
	 */
	@Transactional
	@Override
	public User save(User user) throws DuplicateEntryException, EntityNotFoundException {
		User usuarioNameExistente = this.userRepository.findByUsername(user.getUsername()).orElse(null);
		User usuarioEmailExistente = this.userRepository.findByEmail(user.getEmail()).orElse(null);

		if(usuarioNameExistente == null && usuarioEmailExistente == null) {
			Role role = this.roleRepository.findByCode(user.getRole().getCode()).orElse(null);
			if(role != null) {
				user.setActivo(true);
				user.setRole(role);
				String password = user.getPassword();
				user.setPassword(this.bCryptPasswordEncoder.encode(password));
			}else {
			
				throw new EntityNotFoundException(ENTITY_NAME, "code", user.getRole().getCode());
			}
			
		}else {
			StringBuilder duplicateParameters = new StringBuilder();
			duplicateParameters.append(usuarioNameExistente != null ? "username" : "email");
			throw new DuplicateEntryException(ENTITY_NAME, duplicateParameters.toString(), 
					(usuarioNameExistente != null ? user.getUsername() : user.getEmail()));
		
		}
		return userRepository.save(user);
	}
	/** Método para actualizar un usuario
	 *@param id
	 *@param user
	 *@return User
	 *@exception DuplicateEntryException, EntityNotFoundException
	 */
	@Transactional
	@Override
	public User update(Long id, User user) throws DuplicateEntryException, EntityNotFoundException {
		User userActual = this.userRepository.findById(id).orElse(null);
		Role role = this.roleRepository.findByCode(user.getRole().getCode()).orElse(null);
		if(userActual != null && role != null) {
			User usuarioNameExistente = this.userRepository.
					findByUsernameAndIdUserNot(user.getUsername(), id).orElse(null);
			User usuarioEmailExistente = this.userRepository.
					findByEmailAndIdUserNot(user.getEmail(), id).orElse(null);
			if(usuarioNameExistente == null) {
				userActual.setUsername(user.getUsername());
			}else {
				throw new DuplicateEntryException(ENTITY_NAME, "username", user.getUsername());	
			}
				
			if(usuarioEmailExistente == null) {
				userActual.setEmail(user.getEmail());
			}else {
				throw new DuplicateEntryException(ENTITY_NAME, "email", user.getEmail());	
			}
			
			Role role = this.roleRepository.findByCode(user.getRole().getCode());
			
			userActual.setLastname(user.getLastname());
			userActual.setName(user.getName());
			userActual.setRole(role);
			userActual.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
			logger.info("Updated user " + userActual.getUsername());
			return userRepository.save(userActual);
		}else {
			StringBuilder notFoundParameters = new StringBuilder();
			notFoundParameters.append(userActual == null ? "id" : "role");
			throw new EntityNotFoundException(ENTITY_NAME, notFoundParameters.toString(), 
					userActual == null ? String.valueOf(id) : user.getRole().getCode());
			
		}
		
	}
	/** Método para eliminar un usuario
	 *@param id
	 *@exception EntityNotFoundException
	 */
	@Transactional
	@Override
	public void delete(Long id) throws EntityNotFoundException {
		User usuario = this.userRepository.findById(id).orElse(null);
		if(usuario != null) {
			usuario.setActivo(false);
			userRepository.save(usuario);
			logger.info("Deleted user " + usuario.getUsername());
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
//		userRepository.deleteById(id);
	}
	/** Método para encontrar un usuario
	 *@param id
	 *@exception EntityNotFoundException
	 */
	@Transactional(readOnly=true)
	@Override
	public User findById(Long id) throws EntityNotFoundException {
		User usuario = userRepository.findByIdUserAndActivo(id, true).orElse(null);;
		if(usuario != null) {
			return usuario;
		}else {
			throw new EntityNotFoundException(ENTITY_NAME, "id", String.valueOf(id));
		}
	}
	/** Método para obtener el usuario en la sesión
	 *@param principal
	 *@return String
	 */
	@Override
	@Transactional(readOnly=true)
	public String getPrincipalUsername(Principal principal) {
		String username = null;
		if(principal instanceof UsernamePasswordAuthenticationToken) {
			logger.info("Instace of usernamePasswordAuth");
			username = ((UserPrincipal) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUsername();
		} else {
			logger.info("Not instace of usernamePasswordAuth");
			username = principal.getName();
		}
		logger.info("Username: " + username);
		return username;
	}

	/** Método para mandar el código de restauración
	 *@param parametro
	 *@return ResponseDTO
	 *@exception EntityNotFoundException
	 */
	@Override
	@Transactional
	public ResponseDTO sendRestoreCode(String parametro) throws EntityNotFoundException {
		User usuario = this.userRepository.findByUsernameOrEmail(parametro, parametro).orElseGet(null);
		if(usuario == null || !usuario.isActivo()) {
			throw new EntityNotFoundException(ENTITY_NAME, "param", parametro);
		}
		
		RestoreCode restoreCode = this.restoreCodeService.create(usuario);
			
		String code = restoreCode.getCode();
		String username = StringUtils.capitalize(restoreCode.getUser().getName()
				.concat(" ").concat(restoreCode.getUser().getLastname()));
		
		logger.info("Restore Password: username: [" + username
				+ "] code: [" + code + "]");
		try {
			this.emailService.sendRestorePasswordMail(
					username, 				
					restoreCode.getUser().getEmail(),
					code);
		}catch(Exception e) {
			LoggerUtils.logException(logger, "Fail to send restore password email ", 
					e.getMessage());
			return new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(),
					"Error al enviar correo con codigo");
		}
		return new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(),
				ResponseCodeEnum.PROCESADO.getMensaje());
	}
	/** Método para restaurar el password de un usuario
	 *@param username
	 *@param password
	 *@param code
	 *@return ResponseDTO
	 *@exception EntityNotFoundException
	 */
	@Override
	@Transactional
	public ResponseDTO restorePasswordUser(String username, String password, String code) throws EntityNotFoundException {
		User user= this.userRepository.findByUsername(username).orElseGet(null);
		if(user == null || !user.isActivo()) {
			throw new EntityNotFoundException(ENTITY_NAME, "username", username);
		}
		
		RestoreCode restoreCode = this.restoreCodeService.validate(code, user);
		
		if(restoreCode == null) {
			return new ResponseDTO(ResponseCodeEnum.NO_PROCESADO.getCodigo(),
					ResponseCodeEnum.NO_PROCESADO.getMensaje().concat(". Código no válido"));
		}
		
		String newPasswordEncripted = this.bCryptPasswordEncoder.encode(password);
		user.setPassword(newPasswordEncripted);
		this.userRepository.save(user);
		this.restoreCodeService.deleteCode(restoreCode);
		return new ResponseDTO(ResponseCodeEnum.PROCESADO.getCodigo(),
				ResponseCodeEnum.PROCESADO.getMensaje());
	}

}
