package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pineapplesupermarket.tiendaapi.models.RestoreCode;
import com.pineapplesupermarket.tiendaapi.models.User;
import com.pineapplesupermarket.tiendaapi.repositories.RestoreCodeRepository;
import com.pineapplesupermarket.tiendaapi.services.IRestoreCodeService;
/**
 *Implementación del servicio para restaura codigo 
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Service
public class RestoreCodeServiceImpl implements IRestoreCodeService{
	
//	private static final String ENTITY_NAME = "Restore Code";

	@Value("${restore.code.validity-time}")
	private int codeValidity;
	
	@Autowired
	private RestoreCodeRepository restoreCodeRepository;
	
	/** Método para crear código de restauración
	 *@param user
	 *@return RestoreCode
	 */
	@Override
	public RestoreCode create(User user) {
		Calendar calendar = Calendar.getInstance();
		long t = calendar.getTimeInMillis();
		String code = UUID.randomUUID().toString();
		
		Date expirationDate = new Date( t + (this.codeValidity * 60000));
		RestoreCode restoreCode = new RestoreCode(user, code, false, expirationDate);
		return this.restoreCodeRepository.save(restoreCode);
	}
	/** Método para validar código de restauración
	 *@param code
	 *@param user
	 *@return RestoreCode
	 */
	@Override
	public RestoreCode validate(String code, User user){
		RestoreCode restoreUserCode = this.restoreCodeRepository.findByCodeAndUser(code, user)
				.orElseGet(null);
		final Calendar cal = Calendar.getInstance();
		long tiempoDiff = restoreUserCode.getExpirationDate().getTime() - cal.getTime().getTime();
		if(restoreUserCode == null || restoreUserCode.isActivated()) {
			return null;
		}
		
		if(tiempoDiff <= 0) {
			this.restoreCodeRepository.delete(restoreUserCode);
			return null;
		}
		
		return restoreUserCode;
		
	}
	/** Método para eliminar código de restauración
	 *@return RestoreCode
	 */
	@Override
	public void deleteCode(RestoreCode restoreCode) {
		this.restoreCodeRepository.delete(restoreCode);
	}

}
