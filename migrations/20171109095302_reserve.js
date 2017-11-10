exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reserve', function(table) {
      table.increments();
      table.integer('id_liste');
      table.integer('id_item');
      table.string('nom');
      table.string('msgPrive');
      table.string('msgGlobal');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('reserve')
  ]);
};
