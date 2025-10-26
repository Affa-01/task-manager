// server.js
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Postgres client config — update to match your DB
const client = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5555,
  database: 'postgres'
});

await client.connect();

// READ all lists
app.get('/lists', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM lists');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lists ' + err});
  }
});

// CREATE list
app.post('/lists', async (req, res) => {
  try {
    const { listName } = req.body;
    const result = await client.query(
      'INSERT INTO lists (list_name) VALUES ($1) RETURNING *',
      [listName]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create list ' + err });
  }
});


// DELETE a list by id
app.delete('/lists/:id', async (req, res) => {
  try {
    console.log("me gusta el biryani" +req.params.id);
    const result = await client.query(
      'DELETE FROM lists WHERE list_id = $1; \
      DELETE FROM todos WHERE list_id = $1;',
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete lists ' + err });
  }
});



// READ tasks from list
app.get('/tasks/:listId', async (req, res) => {
  try {
    const result = await client.query('SELECT todo_id, entry_string, pos FROM todos WHERE list_id = $1 ORDER BY pos ASC',
      [req.params.listId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch task ' + err });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await client.query(
      'WITH pos_pivot as (DELETE FROM todos WHERE todo_id = $1 RETURNING pos, list_id)\
      UPDATE todos SET pos = pos-1 WHERE list_id = (SELECT list_id FROM pos_pivot) AND pos>(SELECT pos FROM pos_pivot)',
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task ' + err });
  }
});

// CREATE list
app.post('/tasks', async (req, res) => {
  try {
    const { listId, entry } = req.body;
    const result = await client.query(
      'WITH new_pos AS (SELECT COALESCE(MAX(pos)+1, 1) AS p FROM todos WHERE list_id = $2)\
      INSERT INTO todos (entry_string, list_id, pos) SELECT $1, $2, p FROM new_pos RETURNING *',
      [entry, listId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task ' + err });
  }
});




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});