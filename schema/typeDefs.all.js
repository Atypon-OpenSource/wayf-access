const typeDefs = `
# Date custom scalar type
scalar Date

type PublicPublisher {
  id: ID!
  name: String!
  code: String
  status: String!
  date: String
  contact: PublisherContact!
}

type AdminPublisher {
  id: ID!
  name: String!
  code: String
  status: String!
  date: String
  api: PublisherApi
  contact: PublisherContact!
}

type PublisherApi {
  widgetUrl: String
  token: String!
}

type PublisherContact {
  id: String
  name: String
  email: String
  phone: String
}

type adminUser {
  type: String
  value: String
  validUntil: Date
}

type Idp {
  lastActiveDate: String
  id: ID!
  name: String!
  logoUrl: String
  frequency: Int!
  type: IdpTypeEnum!
}

enum IdpTypeEnum {
  SAML
  OAUTH
  OPEN_ATHENS
}

type Activity {
  id: ID!
  publisherId: String!
  publisherName: String!
  date: String!
  action: ActivityActionEnum!
  data: ActivityData
}

enum ActivityActionEnum {
  REMOVE_IDP
  READ_IDP_HISTORY
  ADD_IDP
}

type ActivityData {
  type: String
  id: String
  name: String
}

type Query {
  listActivity (skip: Int, limit:Int): [Activity!]!
  listIdp: [Idp!]!
  listPublishers (skip: Int, limit:Int): [AdminPublisher]!
  listPendingRegistrations (skip: Int, limit:Int): [PublicPublisher]
}

type Mutation {
  deleteIdp(id: ID!): Idp
  adminLogin(emailAddress: String!, password: String!): adminUser
}

`;

module.exports = typeDefs;
