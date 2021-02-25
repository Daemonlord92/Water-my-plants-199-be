
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
  	tbl.increments();
  	tbl.string('username', 255).notNullable().unique();
  	tbl.string('password', 128).notNullable();
  	tbl.string('phone_number', 15).notNullable();
  })
  .createTable('species', tbl => {
  	tbl.increments();
  	tbl.string('species_name', 255).notNullable().unique();
  })
  .createTable('plants', tbl => {
  	tbl.increments();
  	tbl.string('nickname', 255).notNullable();
  	tbl.integer('h20Frequency').notNullable();
  	tbl.integer('species_id').unsigned().notNullable().references('species.id');
  	tbl.integer('user_id').unsigned().notNullable().references('users.id');
  	tbl.string('image', 3052);
  })
};

exports.down = function(knex) {
  
};
