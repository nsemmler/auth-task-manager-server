const table = 'tasks'
exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      list_id: 3,
      title: 'Complete Auth Checkpoint',
      description: `Roger has completed it. Ask him for help if needed.`
    },
    {
      id: 2,
      list_id: 3,
      title: 'Refactor Galvanize eCommerce Site',
      description: `Ask Scott how he got that dropdown navigation to work!`
    },
    {
      id: 3,
      list_id: 1,
      title: 'Book ticket home',
      description: `August 31st - September 4th`
    },
    {
      id: 4,
      list_id: 1,
      title: 'Call Mom and Dad',
      description: `It's their anniversary soon!`
    },
    {
      id: 5,
      list_id: 2,
      title: 'Grade Q2 Projects',
      description: `Make sure to check the .gitignore.`
    },
    {
      id: 6,
      list_id: 1,
      title: 'Drink water'
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
}
