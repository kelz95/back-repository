package com.pineapplesupermarket.tiendaapi.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
/**
 *Modelo del usuario
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Entity
@Table(name="ps_user")

public class User implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_user")
	private Long idUser;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="id_role")
	@NotNull
	private Role role;
	
	@NotEmpty
	@Column(length = 30, nullable = false, unique = true)
	private String username;
	
	@NotEmpty
	@Column(length = 200, nullable = false)
	private String password;
	
	@NotEmpty
	@Column(length = 60, nullable = false)
	private String email;
	
	@NotEmpty
	@Column(length = 45, nullable = false, unique = true)
	private String name;
	
	@NotEmpty
	@Column(length = 45, nullable = false)
	private String lastname;
	
	@Column(name="creation_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createAt;
	
	@Column (nullable = false)
	private Boolean activo;
	
	@PrePersist
	public void prePersist() {
		createAt= new Date();
	}
	
	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Boolean isActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastname;
	}
	public void setLastName(String lastName) {
		this.lastname = lastName;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Date getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
	private static final long serialVersionUID = 1L;


}
