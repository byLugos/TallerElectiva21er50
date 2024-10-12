# Taller de API RESTFul – Segundo Semestre de 2024

## Integrantes: 
  * Silvana Gutierrez Chaparro
  * Ian Mateo Rodriguez Carrillo
  * Daniel Alejandro Muñoz 

## Generalidades de la API:

  ## Autenticación
	
	Antes de acceder a los endpoints protegidos, debe obtener un token JWT:
    	
     	1. Realice una solicitud POST a 
    	   
    	   https://earnest-dream-production.up.railway.app/api/login 
    
     	   con el siguiente cuerpo:
    		
    	   { 
      		"email": "admin@ejemplo.com", 
      		"password": "contraseñaReMela" 
    	   }
    
    	2. La respuesta incluirá un token JWT que debe ser incluido en el header Authorization de todas las solicitudes subsiguientes.
    	
    	   Nota: El token tiene una validez de 1 hora.

  ## Endpoints
    
    A continuación se detallan los endpoints disponibles. Para todos los endpoints protegidos, incluya el token JWT en el header de la solicitud:
    	
	Authorization: Bearer [su_token_jwt]

  ## Swagger

   **https://earnest-dream-production.up.railway.app/docs**


## Popietarios

1. Obtener todos los propietarios
	* Método: GET
	* URL: **https://earnest-dream-production.up.railway.app/owners**
	* Descripción: Recupera la lista de todos los propietarios.

2. Obtener un propietario por ID
	* Método: GET
	* URL: **https://earnest-dream-production.up.railway.app/owners/:id**
	* Descripción: Recupera los detalles de un propietario específico.

3. Crear un nuevo propietario
	* Método: POST
	* URL: **https://earnest-dream-production.up.railway.app/owners**
	* Descripción: Crea un nuevo propietario.

4. Actualizar un propietario
	* Método: PUT
	* URL: **https://earnest-dream-production.up.railway.app/owners/:id**
	* Descripción: Actualiza la información de un propietario existente.

5. Eliminar un propietario
	* Método: DELETE
	* URL: **https://earnest-dream-production.up.railway.app/owners/:id**
	* Descripción: Elimina un propietario de la base de datos.

## Mascotas

1. Obtener todas las mascotas
	* Método: GET
	* URL: **https://earnest-dream-production.up.railway.app/pets**
	* Descripción: Recupera la lista de todas las mascotas.

2. Obtener una mascota por ID
	* Método: GET
	* URL: **https://earnest-dream-production.up.railway.app/pets/:id**
	* Descripción: Recupera los detalles de una mascota específica.

3. Crear una nueva mascota
	* Método: POST
	* URL: **https://earnest-dream-production.up.railway.app/pets**
	* Descripción: Crea una nueva mascota y la asocia a un propietario.

4. Actualizar una mascota
	* Método: PUT
	* URL: **https://earnest-dream-production.up.railway.app/pets/:id**
	* Descripción: Actualiza la información de una mascota existente.

5. Eliminar una mascota
	* Método: DELETE
	* URL: **https://earnest-dream-production.up.railway.app/pets/:id**
	* Descripción: Elimina una mascota de la base de datos.
