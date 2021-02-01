CREATE TABLE opcoes (
  id_pergunta TEXT REFERENCES perguntas(id_pergunta),
  id_opcao TEXT PRIMARY KEY,
  opcao_texto TEXT NOT NULL
);

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  ('pergunta_1','brilho_rosto','Com brilho em todo o rosto'),
  ('pergunta_1','brilho_zona_t','Com brilho na zona T'),
  ('pergunta_1','pontos_negros','Com pontos negros'),
  ('pergunta_1','borbulhas','Com borbulhas'),
  ('pergunta_1','poros_dilatados','Com poros dilatados'),
  ('pergunta_1','pele_nenhum','Nenhuma das anteriores');

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  ('pergunta_2', 'secura_todo_rosto', 'Em todo o rosto'),
  ('pergunta_2', 'secura_macas', 'Só nas maças do rostos'),
  ('pergunta_2', 'secura_poros_pouco_visiveis', 'Poros pouco visíveis'),
  ('pergunta_2', 'secura_zonas_sensiveis', 'Tem zonas vermelhas no rosto/zonas sensíveis'),
  ('pergunta_2', 'secura_nenhum', 'Não sinto secura');

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  ('pergunta_3', 'maquilhagem_todo_dia', 'Dura todo o dia'),
  ('pergunta_3', 'maquilhagem_sem_algum_tempo', 'Desaparece completamente passado de algum tempo'),
  ('pergunta_3', 'maquilhagem_zonas_sem_algum_tempo', 'Desaparece em algumas zonas do rosto passado algum tempo'),
  ('pergunta_3', 'maquilhagem_irregular', 'Fica irregular, com zonas a descamar'),
  ('pergunta_3', 'maquilhagem_brilho', 'Fico com muito brilho no rosto'),
  ('pergunta_3', 'maquilhagem_nenhum', 'Não uso maquilhagem');