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

```

Se puede acceder a la aplicación en https://pineapple-back.herokuapp.com/

<!-- Links -->

[1]: https://devcenter.heroku.com/articles/heroku-cli
