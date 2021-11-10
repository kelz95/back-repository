package com.pineapplesupermarket.tiendaapi.services;

import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.models.User;

public interface IRestoreCodeService {
	
	public RestoreCode create(User user);
	
	public RestoreCode validate(String code, User user) throws EntityNotFoundException;
	
	public void deleteCode(RestoreCode restoreCode);
	
}
