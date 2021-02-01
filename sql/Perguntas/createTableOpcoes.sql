CREATE TABLE opcoes (
  id_opcao TEXT PRIMARY KEY,
  id_pergunta TEXT REFERENCES perguntas(id_pergunta),
  opcao_texto TEXT NOT NULL
);

INSERT into opcoes (id_opcao, id_pergunta, opcao_texto) 
VALUES 
  ('brilho_rosto', 'pergunta_1', 'Com brilho em todo o rosto'),
  ('brilho_zona_t', 'pergunta_1', 'Com brilho na zona T'),
  ('pontos_negros', 'pergunta_1', 'Com pontos negros'),
  ('borbulhas', 'pergunta_1', 'Com borbulhas'),
  ('poros_dilatados', 'pergunta_1', 'Com poros dilatados'),
  ('pele_nenhum', 'pergunta_1', 'Nenhuma das anteriores');



INSERT into opcoes (id_opcao, id_pergunta, opcao_texto) 
VALUES 
  ('secura_todo_rosto', 'pergunta_2', 'Em todo o rosto'),
  ('secura_macas', 'pergunta_2', 'Só nas maças do rostos'),
  ('secura_poros_pouco_visiveis', 'pergunta_2', 'Poros pouco visíveis'),
  ('secura_zonas_sensiveis', 'pergunta_2', 'Tem zonas vermelhas no rosto/zonas sensíveis'),
  ('secura_nenhum', 'pergunta_2', 'Não sinto secura');

INSERT into opcoes (id_opcao, id_pergunta, opcao_texto) 
VALUES 
  ('maquilhagem_todo_dia', 'pergunta_3', 'Dura todo o dia'),
  ('maquilhagem_sem_algum_tempo', 'pergunta_3', 'Desaparece completamente passado de algum tempo'),
  ('maquilhagem_zonas_sem_algum_tempo', 'pergunta_3', 'Desaparece em algumas zonas do rosto passado algum tempo'),
  ('maquilhagem_irregular', 'pergunta_3', 'Fica irregular, com zonas a descamar'),
  ('maquilhagem_brilho', 'pergunta_3', 'Fico com muito brilho no rosto'),
  ('maquilhagem_nenhum', 'pergunta_3', 'Não uso maquilhagem');