const knex = require("knex")({
  client: "pg",
  connection: {
	  
	host : '127.0.0.1',
	user : 'jaroslaw',
	password : 'password',
	database : 'bookstore'
  },
});

class DatabaseService {
	
  client

  constructor() {}

  async connect() {

  }

  async end() {
    await this.client.end();
  }

  /**
   * @template T
   * @param {T} something
   * @returns {Promise<T> }
   */
  async insert(something, table) {
    const insertedRows = await knex(table).insert(something).returning('*');
    //let result = await this.client.query(queryText);
    console.log("rows:"+JSON.stringify(insertedRows));
    //todo postresql
    return insertedRows[0]
  }

  /**
   * @template T
   * @param {string} id
   * @returns {Promise<T> }
   */
  async get(id) {
    //todo postresql
    return something;
  }

  async query(queryText) {
    return something;
  }
}

module.exports ={ DatabaseService, knex}
