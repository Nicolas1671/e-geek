FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

# En DB_HOST Nombre del servicio si estoy en docker-compose, o host.docker.internal si es que estoy localmente. 
# Si no uso compose, poner el IP del contenedor o el nombre de la Image DB si uso network.
# Para conectar contenedores, por ejemplo con la base de datos, primero crear la network con (sino tenemos que usar el IP del contenedor de la DB) estos comandos en la terminal:
# ~ docker network create e-geek-network
# ~ docker run --name e-geek-db --network e-geek-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=pincha -e POSTGRES_DB=appnestjs -v pgdata:/var/lib/postgresql/data -d postgres
# En el run de la app luego del build de la imagen, hay que correr el siguiente comando:
# ~ docker build . -t e-geek-app .    
# ~ docker run -p 3001:3000 --network e-geek-network e-geek-app
