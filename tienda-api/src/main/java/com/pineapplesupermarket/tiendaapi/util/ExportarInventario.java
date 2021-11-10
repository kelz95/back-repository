package com.pineapplesupermarket.tiendaapi.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import com.pineapplesupermarket.tiendaapi.models.Product;
import com.pineapplesupermarket.tiendaapi.repositories.ProductRepository;

@Component("/api/v1/producto/exportar")
public class ExportarInventario extends AbstractXlsxView{
	
	@Autowired
	private ProductRepository productRepository;
	
	private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


	@Override
	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Calendar cal = Calendar.getInstance();
		StringBuilder filename = new StringBuilder();
		filename.append("productos_inventario_");
		filename.append(cal.getTimeInMillis());
		filename.append(".xlsx");
		
		response.setHeader("Content-Disposition", "attachment; filename=\""+ filename.toString() + "\"");
		Sheet sheet = workbook.createSheet("Inventario de Productos");
		
		List<Product> listaProductos =  (List<Product>) productRepository.findAll();
		
		Row titulos = sheet.createRow(0);
		Cell cell = titulos.createCell(0);

		titulos.createCell(0).setCellValue("Id Producto");
		titulos.createCell(1).setCellValue("Clave Categoría");
		titulos.createCell(2).setCellValue("Categoría");
		titulos.createCell(3).setCellValue("Clave Producto");
		titulos.createCell(4).setCellValue("Nombre");
		titulos.createCell(5).setCellValue("Descripción");
		titulos.createCell(6).setCellValue("Cantidad");
		titulos.createCell(7).setCellValue("Precio Unitario");
		titulos.createCell(8).setCellValue("Fecha de creación");
		titulos.createCell(9).setCellValue("Fecha de modificación");
		
		int rownum = 1;
		
		for(Product producto: listaProductos) {
			Row fila = sheet.createRow(rownum ++);
			cell = fila.createCell(0);
			cell.setCellValue(producto.getIdProduct());
			
			cell = fila.createCell(1);
			cell.setCellValue(producto.getProductCategory().getCode());
			
			cell = fila.createCell(2);
			cell.setCellValue(producto.getProductCategory().getDescription());
			
			cell = fila.createCell(3);
			cell.setCellValue(producto.getName());
			
			cell = fila.createCell(4);
			cell.setCellValue(producto.getName());
			
			cell = fila.createCell(5);
			cell.setCellValue(producto.getDescription());
			
			cell = fila.createCell(6);
			cell.setCellValue(producto.getQuantity());
			
			cell = fila.createCell(7);
			cell.setCellValue(producto.getUnitPrice());
			
			cell = fila.createCell(8);
			cell.setCellValue(dateFormat.format(producto.getCreationDate()));
			
			cell = fila.createCell(9);
			cell.setCellValue(producto.getModificationDate() == null ? null : dateFormat.format(producto.getModificationDate()));
		}
	}

}
