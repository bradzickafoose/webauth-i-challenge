exports.up = function(knex, promise) {
  return knex.schema.createTable('users', table => {
    table.increments();

    table
      .string('username', 128)
      .notNullable()
      .unique();
    table.string('password', 128).notNullable();
  });
};

exports.down = function(knex, promise) {
  return knex.schema.dropTableIfExists('users');
};
