-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heroku_5e5a99a3d3d237e
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heroku_5e5a99a3d3d237e
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_5e5a99a3d3d237e` DEFAULT CHARACTER SET utf8 ;
USE `heroku_5e5a99a3d3d237e` ;

-- -----------------------------------------------------
-- Table `heroku_5e5a99a3d3d237e`.`ps_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_5e5a99a3d3d237e`.`ps_role` (
  `id_role` INT NOT NULL,
  `code` VARCHAR(20) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`),
  UNIQUE INDEX `clave_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_5e5a99a3d3d237e`.`ps_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_5e5a99a3d3d237e`.`ps_user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `id_role` INT NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `activo` TINYINT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_ps_user_ps_role1` (`id_role` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_ps_user_ps_role1`
    FOREIGN KEY (`id_role`)
    REFERENCES `heroku_5e5a99a3d3d237e`.`ps_role` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_5e5a99a3d3d237e`.`ps_product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_5e5a99a3d3d237e`.`ps_product_category` (
  `id_product_category` INT NOT NULL,
  `code` VARCHAR(30) NOT NULL,
  `description` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_product_category`),
  UNIQUE INDEX `clave_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_5e5a99a3d3d237e`.`ps_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_5e5a99a3d3d237e`.`ps_product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `id_product_category` INT NOT NULL,
  `code` VARCHAR(20) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(4,2) NOT NULL,
  `picture` VARCHAR(180) NULL DEFAULT NULL,
  `creation_date` DATETIME NOT NULL,
  `modification_date` DATETIME NULL,
  PRIMARY KEY (`id_product`),
  UNIQUE INDEX `name_id_category_UNIQUE` (`name` ASC, `id_product_category` ASC),
  INDEX `fk_ps_product_ps_product_category1` (`id_product_category` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  CONSTRAINT `fk_ps_product_ps_product_category1`
    FOREIGN KEY (`id_product_category`)
    REFERENCES `heroku_5e5a99a3d3d237e`.`ps_product_category` (`id_product_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_5e5a99a3d3d237e`.`ps_restore_code`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_5e5a99a3d3d237e`.`ps_restore_code` (
  `id_restore_code` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `code` VARCHAR(200) NOT NULL,
  `expiration_date` DATETIME NOT NULL,
  `activated` TINYINT NOT NULL,
  PRIMARY KEY (`id_restore_code`),
  INDEX `fk_ps_restore_code_ps_user1_idx` (`id_user` ASC),
  CONSTRAINT `fk_ps_restore_code_ps_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `heroku_5e5a99a3d3d237e`.`ps_user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
