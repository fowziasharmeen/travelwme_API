export default {
  User: {
    trips: ({ id }, args, { models }) => 
      models.Trip.findAll({ 
        include: [{
          model: models.User,
          where: { id }
        }]
      })
  },
  Trip: {
    users: ({ id }, args, { models }) => 
    models.User.findAll({ 
      include: [{
        model: models.Trip,
        where: { id }
      }]
    })
  },
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({
        where: {
          id,
        },
      }),
    searchTrip: (parent, args, { models }) => {
      return models.Trip.findAll({
        where: {
          gender: args.gender,
          age: args.age,
          fitness: args.fitness,
          relationship_status: args.relationship_status,
        },
        include: [{
          model: models.TripKeyword,
          where: {
            key1: args.key1,
            key2: args.key2,
            key3: args.key3,
            key4: args.key4,
            key5: args.key5,
            key6: args.key6,
          }
        }]
      })
    },
      
    allTrips: (parent, args, { models }) => models.Trip.findAll(),
    getTrip: (parent, { id }, { models }) =>
      models.Trip.findOne({
        where: {
          id,
        },
      }),
  },

  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: async (parent, args, { models }) => {
      const id = args.id;
      await delete args.id;
      return models.User.update( args, { where: { id } })
    },
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    createTrip: async (parent, args, { models }) => {
      const Trip = await models.Trip.create({
        title: args.title, 
        descriptions: args.descriptions, 
        cost: args.cost, 
        date_start: args.date_start, 
        date_end: args.date_end, 
        gender: args.gender, 
        age: args.age, 
        fitness: args.fitness, 
        relationship_status: args.relationship_status, 
        trip_state: args.trip_state,
      });
      const TripMembers = await models.TripMembers.create({ 
        tripId: Trip.id, 
        userId: args.userId, 
        user_type: "creator" 
      });
      const TripKeyword = await models.TripKeyword.create({
        tripId: Trip.id,
        key1: args.key1,
        key2: args.key2,
        key3: args.key3,
        key4: args.key4,
        key5: args.key5,
        key6: args.key6,
      })
      return Trip;
    }, 
    updateTrip: async (parent, args, { models }) => {
      const updateTrip = await models.Trip.update({
        title: args.title, 
        descriptions: args.descriptions, 
        cost: args.cost, 
        date_start: args.date_start, 
        date_end: args.date_end, 
        gender: args.gender, 
        age: args.age, 
        fitness: args.fitness, 
        relationship_status: args.relationship_status, 
        trip_state: args.trip_state,
      }, { where: { id: args.id } })
      const updateTripKeyword = await models.TripKeyword.update({
        tripId: Trip.id,
        key1: args.key1,
        key2: args.key2,
        key3: args.key3,
        key4: args.key4,
        key5: args.key5,
        key6: args.key6,
      }, { where: { tripId: args.id } } );
      return updateTrip;
    },
    updateTripState: (parent, args, { models }) => 
      models.Trip.update({ trip_state: args.new_state },  { where: { id: args.id } }),
    updateUserRelationshipToTrip: (parent, args, { models }) => 
      models.TripMembers.update({ user_type: args.user_type }, { where: { userId: args.userId, tripId: args.tripId }}),
    interestedInATrip: (parent, args, { models }) => 
      models.TripMembers.create(args)
  },
};

// user.addProject(project, { through: { status: 'started' }})


// updateUserRelationshipToTrip(id: Int!, tripId: Int!, currentRelationship: String!, newRelationship: String!): Int! 