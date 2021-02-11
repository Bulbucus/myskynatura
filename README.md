# MYSKYNATURA 

## Um website onde o utilizador faz um questionario e consoante as suas respostas é lhe dado um resultado dos melhores produtos.

No decorrer deste projeto consegui fazer uma boa utilizaçao de ferramentas essencias para desenvolver qualquer projeto full-stack

Neste projeto utilizei as seguintes ferramentas:

```
Back-end:
  Nodejs
  Express
  EJS (back-office)
  PostreSQL (base de dados)
Front-end:
  React
```
__________________________________________________________

Para a utilizaçao deste projeto no seu computador:
 
 entrar na pasta /client e /server e fazer:
  ``
   npm install
   ``

Para rodar o client:
  ``
  npm start
  ``

Para rodar o server:
  ``
  npm run dev
  ``
__________________________________________

Para configurar a base de dados:
  criar ficheiro .env em /server e preencher com:
  
  ``` sh
  PGHOST='localhost'
  PGUSER='user'
  PGDATABASE='nome da base dados'
  PGPASSWORD='password base de dados'
  PGPORT=5432

  JWT_SECRET='averylongstring'

  HOST='http://localhost'

  ADMIN_USER = 'myskynatura'
  ADMIN_PASSWORD = 'myskynatura'
  ```

abrir POSTGRESQL(psql) e criar base de dados com o nome da base de dados em .env

e executar comando /sql/initialDataBase.sql no psql

____________________________________________________

Para dados de teste pode executar /sql/addValuesInitial.sql

_______________________________________________________

Para funcionamento de SASS na front-end colocar em .env do /client:

``
SASS_PATH:./node_modules;./src
``

________________________________________________________
