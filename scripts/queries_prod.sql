--
SELECT *
FROM ps_user;
--
INSERT INTO `ps_role` (`id_role`, `code`, `description`)
VALUES (1, 'ROL_ADMIN', 'Administrador'),
  (2, 'ROL_VIEWER', 'Usuario Regular');
--
INSERT INTO `ps_user` (
    `id_user`,
    `id_role`,
    `username`,
    `password`,
    `email`,
    `name`,
    `lastname`,
    `creation_date`,
    `activo`
  )
VALUES (
    1,
    1,
    'admin',
    '$2a$10$xWUMaQoj3YLrjeJv4g6ACOCaRnd94CumjXQ9sHw/RCDKreQt5hufm',
    'uncorreo@admin.com',
    'Juan',
    'Perez',
    '2021-11-08 12:00:00',
    1
  );