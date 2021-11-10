# Github Actions

Todo archivo dentro de la carpeta `.github/workflows/` cuenta como una acción mientras cumpla con la sintaxis propuesta.

La acción de despliegue a heroky utilizada es: https://github.com/marketplace/actions/deploy-to-heroku

## `heroku.front.yml`

- Cuando se haga un push a master, se clonará la rama hacia una máquina virtual (VM) de github.
- Luego se utilizarán las credenciales (secretos del repositorio) para conectarse a la cuenta de Heroku y desplegar la aplicación.
- La variable de entorno `HD_APP_BASE` indica dónde se encuentra el proyecto a desplegarse
