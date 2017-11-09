
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
      table.string('id_list');
      table.timestamps();
    }).then(function () {
      return knex("list").insert([
        {email: "test@test.fr", titre: "Mariage hugo et juliette les amoureux", desc : "Liste pour le mariage de notre couple préféré hugo et juliette ! Puissent-ils avoir beaucoup de cadeaux", dateLim : "2017-12-16", destinataire : "Hugo et Juliette"},
      ]);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list')
  ]);
};
