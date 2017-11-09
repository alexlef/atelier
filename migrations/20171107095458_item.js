
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('item', function(table) {
      table.increments();
      table.string('nom');
      table.string('desc', 1000);
      table.decimal('tarif',6,2);
      table.string('url');
      table.string('id_list');
      table.timestamps();
    }).then(function () {
      return knex("item").insert([
        {nom: "PorteStylo", desc: "Cet accessoire rigolo va vous simplifier la vie ! Vous aurez un stylo et des petites feuilles pour écrire toutes vos notes directement sous la main ! Et en plus, il donnera un style cool et original à votre bureau !", tarif : 42, url : "https://www.ideecadeau.fr/porte-stylo-eskimemo-bloc-note.html"},
        {nom: "chaussette Converse", desc: "Les chaussettes baskets sont le cadeau parfait pour tous les amateurs de ces chaussures de sport emblématiques ! Amusez-vous à déambuler chez vous en chaussettes au look de chaussures de sport ! Un grand cadeau pour ceux qui n'aiment pas les chaussettes classiques.", tarif : 8, url : "https://www.ideecadeau.fr/chaussettes-baskets.html"},
        {nom: "jardin thématique", desc: "Qui n'a jamais rêvé d'avoir sa propre forêt de fées ou une plante carnivore à domicile ? Le Sow & Grow fait de ce rêve une réalité et permet de créer une jolie ambiance aussi bien à l'intérieur que sur une terrasse. Voilà donc une bonne idée cadeau originale pour tous les goûts !", tarif : 13.90, url : "https://www.ideecadeau.fr/jardin-thematique-sow-grow.html"},
        {nom: "coffret bière", desc: "Buvez un petit coup aux quatre coins du monde ! Le set cadeau « Tour du monde de la bière » renferme des bières de trois continents différents et réjouira certainement tous-tes les amateurs-trices de la boisson au houblon. Ce coffret, qui contient 9 bouteilles, dont des bières sarde et coréenne, convient parfaitement pour la fête des pères, un anniversaire ou peu importe quelle fête tant qu’elle peut être arrosée. A la vôtre !", tarif : 13.90, url : "https://www.ideecadeau.fr/coffret-cadeau-tour-du-monde-de-la-biere.html"},
        {nom: "chouette lumineuse", desc: "Une idée de décoration qui apporte une ambiance chaleureuse et cosy dans tous les foyers ! Les chouettes s'illuminant grâce à la technologie LED irradient la pièce d'une lumière douce. La seule chose que vous ayez à faire, c'est choisir entre ces trois mignonnes petites chouettes !", tarif : 28.90, url : "https://www.ideecadeau.fr/chouette-lumineuse.html"},
        {nom: "piment a faire pousser", desc: "Les piments habanero sont connus pour être particulièrement forts, même les fans de nourriture épicée les croquent avec respect ! Avec ce set il est désormais possible de les faire pousser à la maison. Tout le nécessaire est inclus dans la boîte cadeau : pot, terre, petits tuteurs et bien sûr les graines de piments habanero. Une super idée cadeau pour ceux qui aiment les plats épicés !", tarif : 28.90, url : "https://www.ideecadeau.fr/piments-extra-forts-a-faire-pousser-soi-meme.html"},
        {nom: "Coussin de cou", desc: "Besoin d'un massage mais personne à disposition ? Placez simplement ce coussin empli de blé bio dans votre micro-ondes ou votre four et laissez-le chauffer. Ensuite appliquez le coussin sur la zone endolorie et sentez la chaleur se répandre lentement. Une bonne idée cadeau pour un moment de relaxation après le travail ou pendant le week-end ! Oubliez les désagréments musculaires avec ce coussin chauffant.", tarif : 28.90, url : "https://www.ideecadeau.fr/coussin-de-cou-chauffant-renard.html"},
      ]);
    }),


  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('item')
  ]);
};
