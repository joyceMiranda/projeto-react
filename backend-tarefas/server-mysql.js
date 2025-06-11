import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
const porta = 3001;

app.use(cors());
app.use(express.json());

// Criação automática da tabela
const criarTabela = async () => {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      finalizada BOOLEAN DEFAULT FALSE,
      uid VARCHAR(255) NOT NULL
    )
  `)
  console.log("Tabela criada/verificada com sucesso!")
}

criarTabela()



// Buscar todas as tarefas
//testar: localhost:3001/tarefas
app.get('/tarefas', async (req, res) => {
  try{
  const [tarefas] = await connection.query('SELECT * FROM tarefas');
    res.status(200).json(tarefas);
  }catch(error){
    res.status(500).send("Erro ao buscar tarefas no servidor: " + error);
  }
});

// Adicionar nova tarefa
//testar: localhost:3001/tarefas 
//incluir objeto json no body da requisição
app.post('/tarefas', async (req, res) => {
    try{
      const tarefa = req.body;
      await connection.query('INSERT INTO tarefas (titulo, uid) VALUES (?, ?)', [tarefa.titulo, tarefa.uid]);
      res.status(201).send("Tarefa adicionada com sucesso! ");
    }catch(error){
      res.status(500).send("Erro ao cadastrar tarefa no servidor: " + error);
    }
 });

// Atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const tarefa = req.body;
    await connection.query('UPDATE tarefas SET titulo = ?, finalizada = ? WHERE id = ?', [tarefa.titulo, tarefa.finalizada, id]);
    res.status(200).send("Tarefa atualizada com sucesso! ");
  }catch(error){
    res.status(500).send("Erro ao alterar tarefa no servidor: " + error);
  }
});

// Excluir tarefa
app.delete('/tarefas/:id', async (req, res) => {
  try{
    const { id } = req.params;
    await connection.query('DELETE FROM tarefas WHERE id = ?', [id]);
    res.status(200).send("Tarefa excluída com sucesso! ");
  }catch(error){
    res.status(500).send("Erro ao excluir tarefa no servidor: " + error);
  }
});

// Iniciar servidor
app.listen(porta, () => {
  console.log("Servidor backend rodando na porta: " + porta);
});


