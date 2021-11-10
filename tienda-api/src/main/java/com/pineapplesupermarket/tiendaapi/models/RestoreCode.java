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

@Entity
@Table(name="ps_restore_code")
public class RestoreCode {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_restore_code")
	private long idRestoreCode;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="id_user")
	private User user;
	
	@Column(length = 200, nullable = false)
	private String code;
	
	@Column(length = 1, nullable = false)
	private boolean activated;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="expiration_date", nullable = false)
	private Date expirationDate;
	
	public RestoreCode() {
	}

	public RestoreCode(User user, String code, boolean activated, Date expirationDate) {
		super();
		this.user = user;
		this.code = code;
		this.activated = activated;
		this.expirationDate = expirationDate;
	}

	public long getIdRestoreCode() {
		return idRestoreCode;
	}

	public void setIdRestoreCode(long idRestoreCode) {
		this.idRestoreCode = idRestoreCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public boolean isActivated() {
		return activated;
	}

	public void setActivated(boolean activated) {
		this.activated = activated;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	
}
