export default `
type Trip {
  id: Int!
  title: String!
  descriptions: String!
  cost: Int!
  date_start: String!
  date_end: String!
  gender: String!
  age: Int!
  fitness: String!
  relationship_status: String!
  trip_state: String!
  users: [User!]!
}

type TripKeyword {
  id: Int!
  word: String!
}

type TripMembers {
  id: Int!
  user_type: String!
  tripId: Int!
}
  
type User {
  id: Int!
  username: String!
  email: String!
  gender: String!
  age: Int!,
  fitness: String!
  relationship_status: String!  
  trips: [Trip!]!
}

type Vote {
  id: Int!
  polarity: Int!
}


type Query {
  allUsers: [User!]!
  getUser(id: Int!): User
  allTrips: [Trip!]!
  searchTrip(gender: String!, age: Int!, fitness: String!, relationship_status: String!, key1: String!, key2: String!, key3: String!, key4: String!, key5: String!, key6: String!): [Trip]!
  getTrip(id: Int!): Trip
}

type Mutation {
  createUser(username: String!, email: String!, gender: String!, age: Int!, fitness: String!, relationship_status: String! ): User
  updateUser(id: Int!, username: String!, email: String!, gender: String!, age: Int!, fitness: String!, relationship_status: String!): [Int!]!
  updateUserRelationshipToTrip(userId: Int!, tripId: Int!, user_type: String!): Int!
  interestedInATrip(userId: Int!, tripId: Int!, user_type: String!): TripMembers
  deleteUser(id: Int!): Int! 
  createTrip(title: String!, descriptions: String!, cost: Int!, date_start: String!, date_end: String!, gender: String!, age: Int!, fitness: String!, relationship_status: String!, trip_state: String!, key1: String!, key2: String!, key3: String!, key4: String!, key5: String!, key6: String!, userId: Int!): Trip
  updateTrip(id: Int!, title: String!, descriptions: String!, cost: Int!, date_start: String!, date_end: String!, gender: String!, age: Int!, fitness: String!, relationship_status: String!, trip_state: String!, key1: String!, key2: String!, key3: String!, key4: String!, key5: String!, key6: String!): [Int!]!
  updateTripState(id: Int! new_state: String!): [Int!]!
  deleteTrip(id: Int!): Int!
}
`;
