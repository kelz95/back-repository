# Heroku

Se debe contar con `heroku-cli`.

## Despliegue del frontend (create-react-app)

```bash
# Login
heroku login

# Crear aplicación (solo si aun no existe)
heroku create pineapple-front

# Añadir paquete de react
heroku buildpacks:add -a pineapple-front mars/create-react-app

# Añadir paquete de soporte a monorepo
heroku buildpacks:add -a pineapple-front https://github.com/lstoll/heroku-buildpack-monorepo -i 1

# Setear la ruta con la variable APP_BASE
heroku config:set -a pineapple-front APP_BASE=tienda-front

# Configurar remoto de heroku
git remote add heroku-front https://git.heroku.com/pineapple-front.git

# Enviar código de la rama master a heroku
git push heroku-front master
```

Se puede acceder a la aplicación en https://pineapple-front.herokuapp.com/

## Despliegue del backend (maven spring)

```bash
# Login
heroku login

# Crear aplicación (solo si aun no existe)
heroku create pineapple-back

# Crear base de datos para el proyecto (solo funciona si la cuenta tiene una tarjeta asociada)
heroku addons:create cleardb:ignite --app pineapple-back

# # Añadir paquete de java ?
# heroku buildpacks:add -a pineapple-back ...

# Añadir paquete de soporte a monorepo
heroku buildpacks:add -a pineapple-back https://github.com/lstoll/heroku-buildpack-monorepo -i 1

# Setear la ruta con la variable APP_BASE
heroku config:set -a pineapple-back APP_BASE=tienda-api

# Configurar remoto de heroku
git remote add heroku-back https://git.heroku.com/pineapple-back.git

# Enviar código de la rama master a heroku
git push heroku-back master

```

Se puede acceder a la aplicación en https://pineapple-back.herokuapp.com/

<!-- Links -->

[1]: https://devcenter.heroku.com/articles/heroku-cli
