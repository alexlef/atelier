
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('list', function(table) {
      table.increments();
      table.string('email');
      table.string('titre');
      table.string('desc',1000);
      table.date('dateLim');
      table.string('destinataire');
      table.boolean('testDestinataire');
      table.string('url');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list')
  ]);
};
