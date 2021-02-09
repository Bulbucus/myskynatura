SELECT perguntas.*, array_agg(opcoes.opcao_texto) as respostas, array_agg(opcoes.id_opcao) as tags 
FROM perguntas,opcoes 
WHERE perguntas.id_pergunta=opcoes.id_pergunta
GROUP BY perguntas.id_pergunta;

/* with id */
SELECT perguntas.*, array_agg(opcoes.id_opcao) as id ,array_agg(opcoes.opcao_texto) as respostas, array_agg(opcoes.tag) as tags 
FROM perguntas,opcoes 
where perguntas.id_pergunta=opcoes.id_pergunta 
group by perguntas.id_pergunta;