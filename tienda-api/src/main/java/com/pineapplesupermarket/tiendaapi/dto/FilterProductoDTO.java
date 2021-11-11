package com.pineapplesupermarket.tiendaapi.dto;

import java.util.Date;
/**
 *Clase del filtro del producto
 *@author Raquel de la Rosa 
 *@version 1.0
 */

public class FilterProductoDTO {

	private String name;
	private String categoria;
	private Date fechaCreacion;
	private int page;
	private int size;
	
	public FilterProductoDTO() {
		super();
	}

	public FilterProductoDTO(String name, String categoria, Date fechaCreacion, int page, int size) {
		super();
		this.name = name;
		this.categoria = categoria;
		this.fechaCreacion = fechaCreacion;
		this.page = page;
		this.size = size;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
}
