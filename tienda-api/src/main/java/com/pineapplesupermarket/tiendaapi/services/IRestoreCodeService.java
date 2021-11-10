package com.pineapplesupermarket.tiendaapi.services;

import com.pineapplesupermarket.tiendaapi.exception.EntityNotFoundException;
import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.models.User;

/**
 *Servicio del codigo de restauración
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface IRestoreCodeService {
	
	public RestoreCode create(User user);
	
	public RestoreCode validate(String code, User user) throws EntityNotFoundException;
	
	public void deleteCode(RestoreCode restoreCode);
	
}
