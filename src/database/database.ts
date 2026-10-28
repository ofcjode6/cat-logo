
import * as SQLite from 'expo-sqlite';

export const databasePromise = SQLite.openDatabaseAsync(
  'mareli.db'
);

export async function inicializarBanco() {
  const database = await databasePromise;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS solicitacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER NOT NULL,
      nome_produto TEXT NOT NULL,
      nome_cliente TEXT,
      data_solicitacao TEXT NOT NULL,
      status_sincronizacao TEXT NOT NULL DEFAULT 'pendente'
    );
  `);


  console.log('Banco SQLite inicializado com sucesso!');
}

export async function registrarSolicitacao(
  produtoId: number,
  nomeProduto: string,
  nomeCliente?: string
  ) {
  const database = await databasePromise;

  const dataSolicitacao = new Date().toISOString();

  const resultado = await database.runAsync(
    `INSERT INTO solicitacoes
      (produto_id, nome_produto, nome_cliente, data_solicitacao, status_sincronizacao)
     VALUES (?, ?, ?, ?, ?)`,
    [
      produtoId,
      nomeProduto,
      nomeCliente ?? null,
      dataSolicitacao,
      'pendente',
    ]
  );

  return resultado.lastInsertRowId;
}
export async function consultarSolicitacoes() {
  const database = await databasePromise;

  const resultados = await database.getAllAsync(
    'SELECT * FROM solicitacoes ORDER BY id DESC'
  );

  console.log('Solicitações registradas:', resultados);

  return resultados;
}