
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('item', function(table) {
      table.increments();
      table.string('nom');
      table.string('desc');
      table.decimal('tarif',6,2);
      table.string('url');
      table.timestamps();
    }).then(function () {
      return knex("item").insert([
        {nom: "PorteStylo", desc: "Cet accessoire rigolo va vous simplifier la vie ! Vous aurez un stylo et des petites feuilles pour écrire toutes vos notes directement sous la main ! Et en plus, il donnera un style cool et original à votre bureau !", tarif : 42, url : "https://www.ideecadeau.fr/porte-stylo-eskimemo-bloc-note.html"},
      ]);
    }),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('item')
  ]);
};
