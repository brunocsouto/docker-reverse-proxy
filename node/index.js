const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const config = {
  host: 'db',
  database: 'nodedb',
  user: 'root',
  password: 'root',
};

app.get('/:name', (req, res) => {
  const connection = mysql.createConnection(config);
  const name = req.params.name;

  connection.query(
    `CREATE TABLE IF NOT EXISTS people(id int auto_increment, name varchar(255), primary key(id))`
  );

  if (name) {
    const insertQuery = `INSERT INTO people(name) values('${name}')`;
    connection.query(insertQuery);
  }

  const selectNamesQuery = `SELECT * FROM people`;
  connection.query(selectNamesQuery, (_, result) => {
    const selectResult = JSON.parse(JSON.stringify(result)) || [];

    let namesList = '';
    selectResult?.forEach((row) => {
      namesList += `<li>${row.name}</li>`;
    });

    res
      .status(200)
      .send(
        `<h1>Full Cycle Rocks</h1><p>Try type a name in the URL: <strong>localhost/[name]</strong></p><ul>${namesList}</ul>`
      );
    connection.end();
  });
});

app.listen(PORT, () => {
  console.log(`Node running on port ${PORT}`);
});
