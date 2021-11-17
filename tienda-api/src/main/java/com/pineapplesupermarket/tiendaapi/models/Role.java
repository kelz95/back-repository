package com.pineapplesupermarket.tiendaapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *Modelo del rol
 *@author Laura saldaña 
 *@version 1.0
 */
@Entity
@Table(name="ps_role")
public class Role implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_role")
	private Long idRole;
	
	@Column(length = 20, nullable = false, unique = true)
	private String code;
	
	@Column(length = 45, nullable = false)
	private String description;
	
	public Long getId() {
		return idRole;
	}

	public void setId(Long id_role) {
		this.idRole = id_role;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
