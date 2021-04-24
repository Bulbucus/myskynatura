# MYSKYNATURA: [LINK](https://myskynatura.xyz) (projeto em progresso)
## Para aceder ao back-office do website: [LINK](https://myskynatura.xyz/admin) e utilizar user: test e pass: test

## Um website onde o utilizador faz um questionario e consoante as suas respostas é lhe dado um resultado dos melhores produtos.

No decorrer deste projeto consegui fazer uma boa utilizaçao de ferramentas essencias para desenvolver qualquer projeto full-stack

Com um front-end modernizado e um back-office totalmente independente

Neste projeto utilizei as seguintes ferramentas:

```
Back-end:
  Nodejs
  Express
  PostreSQL (base de dados)
Front-end:
  React
  EJS (back-office)
DevOps:
  Docker
  Nginx
```
_________________________________________________________

Para a utilizaçao deste projeto no seu computador:
 
basta instalar o docker e docker-compose e rodar dentro da pasta:

``
docker-compose up -d
``

e aceder a: ``http://localhost:4040``

_______________________________________________________

Para a  utilização do back-office ir para ``http://localhost:4040/admin``
e utilizar o valor ADMIN_* no docker-compose.yml para aceder.

_______________________________________________________

Proximas implementações:

- [ ] Colocar botão logout
- [ ] Utilizaçao de cookie para manter sessão
- [ ] Acabar final da pagina inicial
- [ ] Verificação de email
- [ ] Inserir, na base de dados, na table users um timer para quando foi feita a conta
