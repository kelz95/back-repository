package com.pineapplesupermarket.tiendaapi.events;

import org.springframework.context.ApplicationEvent;

import com.pineapplesupermarket.tiendaapi.models.RestoreCode;

public class OnRestorePasswordEvent extends ApplicationEvent{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private RestoreCode restoreCode;	
	
	public OnRestorePasswordEvent(RestoreCode restoreCode) {
		super(restoreCode);
		this.restoreCode = restoreCode;
	}

	public RestoreCode getRestoreCode() {
		return restoreCode;
	}

	public void setRestoreCode(RestoreCode restoreCode) {
		this.restoreCode = restoreCode;
	}

}
