package com.pineapplesupermarket.tiendaapi.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
/**
 *Modelo del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Entity
@Table(name="ps_product", uniqueConstraints = @UniqueConstraint(columnNames= {"name", "id_product_category"}))
public class Product{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_product")
	private long idProduct;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="id_product_category")
	private ProductCategory productCategory;
	
	@Column(length = 20, nullable = false, unique = true)
	private String code;
	
	@Column(length = 45, nullable = false)
	private String name;
	
	@Column(length = 100)
	private String description;
	
	@Column(nullable = false)
	private Integer quantity;
	
	@Column(nullable = false)
	private Double unitPrice;
	
	@Column(length = 300)
	private String picture;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="creation_date", nullable = false)
	private Date creationDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modification_date")
	private Date modificationDate;

	public long getIdProduct() {
		return idProduct;
	}

	public void setIdProduct(long idProduct) {
		this.idProduct = idProduct;
	}

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(Date modificationDate) {
		this.modificationDate = modificationDate;
	}

}
