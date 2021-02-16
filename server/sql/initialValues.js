const {client} = require('./connect');

const initialValues = async () => {
  try{
    const haveValue = await client.query("SELECT * FROM perguntas")

    // verifica se ja tem valores na basedados antes de tentar colocar:
    // se tiver nao coloca os valores inicias
    // isto serve para que o questionario nunca esteja vazio
    if(haveValue.rows.length < 1) { 

      const perguntas = await client.query("INSERT INTO perguntas (type_pergunta, pergunta) \
      VALUES \
      ('checkbox','Como sentes a tua pele?'),\
      ('checkbox','Sentes secura em alguma zona do rosto?'),\
      ('radio','Como se comporta a maquilhagem no teu rosto?') RETURNING *;")

      const opcoes = await client.query(`INSERT into opcoes (id_pergunta, tag, opcao_texto, ordem) \
      VALUES \
        (${perguntas.rows[0].id_pergunta},'brilho_rosto','Com brilho em todo o rosto', NULL),\
        (${perguntas.rows[0].id_pergunta},'brilho_zona_t','Com brilho na zona T', NULL),\
        (${perguntas.rows[0].id_pergunta},'pontos_negros','Com pontos negros', NULL),\
        (${perguntas.rows[0].id_pergunta},'borbulhas','Com borbulhas', NULL),\
        (${perguntas.rows[0].id_pergunta},'poros_dilatados','Com poros dilatados', NULL),\
        (${perguntas.rows[0].id_pergunta},'pele_nenhum','Nenhuma das anteriores',1),\
        (${perguntas.rows[1].id_pergunta}, 'secura_todo_rosto', 'Em todo o rosto', NULL),\
        (${perguntas.rows[1].id_pergunta}, 'secura_macas', 'Só nas maças do rostos', NULL),\
        (${perguntas.rows[1].id_pergunta}, 'secura_poros_pouco_visiveis', 'Poros pouco visíveis', NULL),\
        (${perguntas.rows[1].id_pergunta}, 'secura_zonas_sensiveis', 'Tem zonas vermelhas no rosto/zonas sensíveis', NULL),\
        (${perguntas.rows[1].id_pergunta}, 'secura_nenhum', 'Não sinto secura',1),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_todo_dia', 'Dura todo o dia', NULL),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_algum_tempo', 'Desaparece completamente passado de algum tempo', NULL),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_zonas_sem_algum_tempo', 'Desaparece em algumas zonas do rosto passado algum tempo', NULL),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_irregular', 'Fica irregular, com zonas a descamar', NULL),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_brilho', 'Fico com muito brilho no rosto', NULL),\
        (${perguntas.rows[2].id_pergunta}, 'maquilhagem_nenhum', 'Não uso maquilhagem', 1) RETURNING *;`)

      const produto = await client.query("INSERT INTO produtos (nome, descricao, price, link, image_link) \
      VALUES ('Lapalapa', 'benchmark real-time synergies', 100, 'https://www.perfumesecompanhia.pt/pt/catalogo/cosmetica/rosto/mascaras/prime-renewing-pack-valmont/', 'https://www.perfumesecompanhia.pt/fotos/produtos/7612017058290_1.jpg') RETURNING *;")

      await client.query(`INSERT INTO prod_op (id_produto, id_opcao) \
      VALUES \
      (${produto.rows[0].id_produto}, ${opcoes.rows[0].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[1].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[2].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[3].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[4].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[5].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[6].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[7].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[8].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[9].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[10].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[11].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[12].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[13].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[14].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[15].id_opcao}),\
      (${produto.rows[0].id_produto}, ${opcoes.rows[16].id_opcao});`)
    }
  }catch(error) {
    
  }
}

module.exports = initialValues;