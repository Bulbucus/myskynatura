const addQuestionarioQuery = (id_utilizador, respostas) => {
  const arrayBody = [id_utilizador, respostas]

  return {
    text: 'INSERT INTO questionario (id_utilizador, respostas) VALUES ($1, $2) RETURNING *',
    values: arrayBody
    }
}

const infoQuestionarioQuery = (id_utilizador) => {
  return {
    text: 'select * from questionario where id_utilizador=$1',
    values: [id_utilizador]
  }
}

const compareQuestionarioResult = (respostas) => {
  return {
    text: 'select nome, descricao, price from produtos where tags=$1',
    values: [respostas]
  }
}

const similiarQuestionarioResult = (respostas, type) => {
  return {
    text: `select nome, descricao, price from produtos where tags${type}$1`,
    values: [respostas]
  }
}

exports.addQuestionarioQuery = addQuestionarioQuery;
exports.infoQuestionarioQuery = infoQuestionarioQuery;
exports.compareQuestionarioResult = compareQuestionarioResult;
exports.similiarQuestionarioResult = similiarQuestionarioResult;