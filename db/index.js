import Sequelize from 'sequelize';

// const sequelize = new Sequelize('postgres://vhqwwvao:AJGKf_dXDkbDEebQS46mLMYrAbeGs_H9@baasu.db.elephantsql.com:5432/vhqwwvao');

// this could be used for graphQL testing purpose
// const db = {
//   User: sequelize.import('./models/users'),
// };
const sequelize = new Sequelize('travelwme', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db/sql.storage',
});


const db = {
  Users: sequelize.import('./models/Users'),
  TripKeywords: sequelize.import('./models/TripKeywords'),
  TripMembers: sequelize.import('./models/TripMembers'),
  Trips: sequelize.import('./models/Trips'),
};

// m.Book.hasMany(m.Article, {through: 'book_articles'});
db.Trips.belongsToMany(db.TripKeywords, {
  through: 'Trips_TripKeywords',
  foreign_key: 'Trips',
  as: 'Trips',
});
// m.Article.hasMany(m.Books, {through: 'book_articles'});
db.TripKeywords.belongsToMany(db.Trips, {
  through: 'Trips_TripKeywords',
  foreign_key: 'TripKeywordss',
  as: 'TripKeywords',
});

// project.belongsToMany(user, {
//   through: 'writer_of_project'
//   foreign-key: 'project'
//   as: 'writers'
// });

// project.find({
//   where: { id: 1 },
//   include: [ { model: User, as: 'writers' } ]
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;