CREATE TABLE opcoes (
  id_pergunta SERIAL REFERENCES perguntas(id_pergunta) ON DELETE CASCADE,
  id_opcao TEXT NOT NULL,
  opcao_texto TEXT NOT NULL
);

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  (1,'brilho_rosto','Com brilho em todo o rosto'),
  (1,'brilho_zona_t','Com brilho na zona T'),
  (1,'pontos_negros','Com pontos negros'),
  (1,'borbulhas','Com borbulhas'),
  (1,'poros_dilatados','Com poros dilatados'),
  (1,'pele_nenhum','Nenhuma das anteriores');

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  (2, 'secura_todo_rosto', 'Em todo o rosto'),
  (2, 'secura_macas', 'Só nas maças do rostos'),
  (2, 'secura_poros_pouco_visiveis', 'Poros pouco visíveis'),
  (2, 'secura_zonas_sensiveis', 'Tem zonas vermelhas no rosto/zonas sensíveis'),
  (2, 'secura_nenhum', 'Não sinto secura');

INSERT into opcoes (id_pergunta, id_opcao, opcao_texto) 
VALUES 
  (3, 'maquilhagem_todo_dia', 'Dura todo o dia'),
  (3, 'maquilhagem_algum_tempo', 'Desaparece completamente passado de algum tempo'),
  (3, 'maquilhagem_zonas_sem_algum_tempo', 'Desaparece em algumas zonas do rosto passado algum tempo'),
  (3, 'maquilhagem_irregular', 'Fica irregular, com zonas a descamar'),
  (3, 'maquilhagem_brilho', 'Fico com muito brilho no rosto'),
  (3, 'maquilhagem_nenhum', 'Não uso maquilhagem');