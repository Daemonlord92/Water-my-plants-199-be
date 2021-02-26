
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
  	tbl.increments();
  	tbl.string('username', 255).notNullable().unique();
  	tbl.string('password', 128).notNullable();
  	tbl.string('phoneNumber', 15).notNullable();
  })
  .createTable('plants', tbl => {
  	tbl.increments();
  	tbl.string('nickname', 255).notNullable();
  	tbl.integer('h20Frequency').notNullable();
  	tbl.string('speciesName', 255).notNullable();
  	tbl.integer('userId').unsigned().notNullable().references('users.id');
  	tbl.string('image', 3052);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('plants')
  .dropTableIfExist('users')

};
