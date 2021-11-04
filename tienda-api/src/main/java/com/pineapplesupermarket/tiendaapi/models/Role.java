package com.pineapplesupermarket.tiendaapi.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="ps_role")
public class Role implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_role")
	private Long idRole;
	@Column(length = 20, nullable = false)
	private String code;
	@Column(length = 45, nullable = false, unique = true)
	private String description;
	@OneToMany(mappedBy="role",fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private List<User> users;

	
	public Role() {
		users=new ArrayList<User>();
	}

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

	public List<User> getUser() {
		return users;
	}

	public void setUser(List<User> users) {
		this.users = users;
	}
	
	public void addUser(User users) {
		users.add(users);
	}
	private static final long serialVersionUID = 1L;


}
