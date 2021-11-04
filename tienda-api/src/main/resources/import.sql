INSERT INTO `ps_role` (`code`, `description`) VALUES ( 'ROLE_ADMIN', 'Usuario Administrador');
INSERT INTO `ps_role` (`code`, `description`) VALUES ( 'ROLE_VIEWER', 'Usuario Regular');
INSERT INTO `ps_user` (`id_role`,`username`, `password`, `email`, `name`,`lastname`, `creation_date`) VALUES (1, 'admin','12345','uncorreo@admin.com', 'Juan', 'Perez', '2021-11-03');
INSERT INTO `ps_user` (`id_role`,`username`, `password`, `email`, `name`,`lastname`, `creation_date`) VALUES ( 2, 'reg','12345','otrocorreo@reg.com', 'Ana', 'Buen Día', '2021-11-03');  