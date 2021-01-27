delete from perguntas;

insert 
into perguntas (pergunta, respostas, tags) 
values 
('Como sentes a tua pele?',
'{Com brilho em todo o rosto,Com brilho na zona T,Com pontos negros,Com borbulhas,Com poros dilatados,Nenhuma das anteriores}',
'{brilho_rosto, brilho_zona_t, pontos_negros, borbulhas, poros_dilatados, pele_nenhum}');

insert 
into perguntas (pergunta, respostas, tags) 
values 
('Sentes secura em alguma zona do rosto?',
'{Em todo o rosto,Só nas maças do rosto,Poros pouco visíveis,Tem zonas vermelhas no rosto/zonas sensíveis, Não sinto secura}',
'{secura_todo_rosto, secura_macas, secura_poros_pouco_visiveis, secura_zonas_sensiveis, secura_nenhum}');

insert 
into perguntas (pergunta, respostas, tags) 
values 
('Como se comporta a maquilhagem no teu rosto?',
'{Dura todo o dia, Desaparece completamente passado de algum tempo, Desaparece em algumas zonas do rosto passado algum tempo, Fica irregular\, com zonas a descamar, Fico com muito brilho no rosto, Não uso maquilhagem}',
'{maquilhagem_todo_dia, maquilhagem_sem_algum_tempo, maquilhagem_zonas_sem_algum_tempo, maquilhagem_irregular, maquilhagem_brilho, maquilhagem_nenhum}');


SELECT * FROM users;
SELECT * FROM questionario;
SELECT * FROM produtos;
SELECT * FROM perguntas;