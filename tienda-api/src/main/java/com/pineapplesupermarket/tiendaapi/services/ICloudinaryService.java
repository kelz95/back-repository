package com.pineapplesupermarket.tiendaapi.services;

import org.springframework.web.multipart.MultipartFile;

import com.pineapplesupermarket.tiendaapi.exception.FailUploadedException;
/**
 *Servicio de Cloudinary
 *@author Raquel de la Rosa 
 *@version 1.0
 */
public interface ICloudinaryService {
	public String upload(MultipartFile picture) throws FailUploadedException;
}
