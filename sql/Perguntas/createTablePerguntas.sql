CREATE TABLE perguntas (
  id_pergunta SERIAL PRIMARY KEY,
  type_pergunta VARCHAR(8),
  pergunta TEXT NOT NULL
);


insert 
into perguntas (type_pergunta, pergunta) 
values 
('checkbox','Como sentes a tua pele?');

insert 
into perguntas (type_pergunta, pergunta) 
values 
('checkbox','Sentes secura em alguma zona do rosto?');

insert 
into perguntas (type_pergunta, pergunta) 
values
( 'radio','Como se comporta a maquilhagem no teu rosto?');