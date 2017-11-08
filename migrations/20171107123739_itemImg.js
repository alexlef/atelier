
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('itemImg', function(table) {
      table.increments();
      table.string('nom');
      table.integer('id_item');
      table.timestamps();
    }).then(function () {
      return knex("itemImg").insert([
        {nom: "portestylo.png", id_item:1},
        {nom: "portestylo2.png", id_item:1},
        {nom: "portestylo3.png", id_item:1},
        {nom: "jardin.png", id_item:3},
        {nom: "jardin2.png", id_item:3},
        {nom: "tourdecou.png", id_item:7},
        {nom: "tourdecou2.png", id_item:7},
        {nom: "chouettelumineuse.png", id_item:5},
        {nom: "chaussetteconverse.png", id_item:2},
        {nom: "piment.png", id_item:6},
        {nom: "bière.png", id_item:4},
      ]);
    }),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('itemImg')
  ]);
};
