package com.pineapplesupermarket.tiendaapi.servicesImpl;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.pineapplesupermarket.tiendaapi.exception.FailUploadedException;
import com.pineapplesupermarket.tiendaapi.services.ICloudinaryService;
/**
 *Implementación del servicio de Cloudinary
 *@author Raquel de la Rosa 
 *@version 1.0
 */
@Service
public class CloudinaryServiceImpl implements ICloudinaryService {
	
	private static final Logger logger = LoggerFactory.getLogger(CloudinaryServiceImpl.class);

	//pasar a properties
	Cloudinary cloudinary = new Cloudinary();

	/**Método para subir una imagen
	 *@param MultipartFile
	 *@return string
	 *@exception IOException
	 */
	public String upload(MultipartFile picture) throws FailUploadedException {
		try {
			
			@SuppressWarnings("rawtypes")
			Map map = cloudinary.uploader().upload(picture.getBytes(), ObjectUtils.emptyMap());
			String publicId = map.get("public_id").toString();
			
			logger.info("Successfully uploaded file: " + publicId);
	
			return map.get("url").toString();
		} catch (IOException e) {
			throw new FailUploadedException(e.getMessage(), e);
		}
	}
	
	
}
