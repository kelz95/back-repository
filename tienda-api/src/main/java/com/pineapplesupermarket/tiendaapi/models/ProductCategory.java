package com.pineapplesupermarket.tiendaapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
/**
 *Modelo de las categorías del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Entity
@Table(name="ps_product_category")
public class ProductCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_product_category")
	private Long idProductCategory;
	
	@NotEmpty
	@Column(name = "code", length = 30, unique = true, nullable = false)
	private String code;
	
	@NotEmpty
	@Column(name = "description", length = 50, nullable = false)
	private String description;
	
	
	public Long getIdProductCategory() {
		return idProductCategory;
	}
	public void setIdProductCategory(Long idProductCategory) {
		this.idProductCategory = idProductCategory;
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
