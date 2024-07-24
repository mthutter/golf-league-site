const { Client } = require("pg");

const config = {
  user: "mthutter",
  host: "dpg-cou1qeol5elc73c48fug-a.oregon-postgres.render.com",
  database: "pggl",
  password: "pLJinuMnRZQFZy93kXUuu0fMk5TZuJ9X",
  port: "5432",
  ssl: "true",
};

async function selectTableData(tablename) {
  const client = new Client(config);
  try {
    await client.connect();
    const result = await client.query("select * from " + tablename);
    console.table(result.rows);
  } catch (error) {
    console.error("Something bad happened:", error);
  } finally {
    await client.end();
    console.log("Client disconnected after SELECT...");
  }
}

async function insertUserTableData(username,first,last,email,phone,password) {
  const client = new Client(config);
  try {
    await client.connect();
    await client.query(
      "insert into golfleague.users (username, first, last, email, phone, password) values ($1,$2,$3,$4,$5,$6)",
      [username, first, last, email, phone, password]
    );
    const result = await client.query("select * from golfleague.users");
    console.table(result.rows);
  } catch (error) {
    console.error("Something bad happened during INSERT", error);
  } finally {
    await client.end();
    console.log("Client disconnect after INSERT...");
  }
}

async function deleteUserTableData(username){
    const client = new Client(config);
    try {
      await client.connect();
      const result = await client.query("delete from golfleague.users where username = ($1)", [username]);
      console.table(result.rows);
    } catch (error) {
      console.error("Something bad happened:", error);
    } finally {
      await client.end();
      console.log("Client disconnected after DELETE...");
    }
}

function createUser() {}

function deleteUser() {}

function modifyUser() {}

function readTable() {}

module.exports = {
  selectTableData,
  insertUserTableData,
  deleteUserTableData
};
