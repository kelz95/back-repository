package com.pineapplesupermarket.tiendaapi.services;

import org.springframework.web.multipart.MultipartFile;

import com.pineapplesupermarket.tiendaapi.exception.FailUploadedException;

public interface ICloudinaryService {
	public String upload(MultipartFile picture) throws FailUploadedException;
}
