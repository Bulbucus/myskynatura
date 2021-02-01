CREATE SEQUENCE perguntas_id_pergunta_seq
START WITH 1
INCREMENT 1
MINVALUE  1
MAXVALUE 1000000
CACHE 1;


CREATE TABLE perguntas (
  id_pergunta TEXT PRIMARY KEY DEFAULT 'pergunta_'||nextval('perguntas_id_pergunta_seq'::regclass),
  type_pergunta VARCHAR(8),
  pergunta TEXT NOT NULL
);

ALTER SEQUENCE perguntas_id_pergunta_seq OWNED BY public.perguntas.id_pergunta;


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