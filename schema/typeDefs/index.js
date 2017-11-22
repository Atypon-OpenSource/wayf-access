const userTypeDefs = require('./userDefs'),
      adminTypeDefs = require('./adminDefs');


const queryDefs =
`
type Query {
  getDevice: DeviceType!
  getUser (id: ID!): UserType!
  getPublisher (id: ID!): AdminPublisherType!
  getPendingRegistration (id: ID!): PublicPublisherType!
  listActivity (skip: Int, limit:Int): [ActivityType!]!
  listIdp: [IdpType!]!
  listMembers (skip: Int, limit:Int): [MemberPublisherType]!
  listPublishers (skip: Int, limit:Int): [AdminPublisherType]!
  listPendingRegistrations (skip: Int, limit:Int): [PublicPublisherType]
  listAdminUsers(limit: Int, skip: Int): [UserType]!
}

type Mutation {
  withdrawConsent: String
  deletePublisher (id: ID!): String
  deleteDevice(id:ID!): String
  forgetIdp(id: ID!): String
  deleteIdp(id: ID!): IdpType
  adminLogin(emailAddress: String!, password: String!): AdminUserType
  createPublisher (name:String!, code: String, email: String!, phone: String!, firstName: String!, lastName: String!, registrationId: Int): AdminPublisherType
  registerPublisher (name:String!,  email: String!, phone: String!, firstName: String!, lastName: String!): PublicPublisherType
  rejectRegistration (id: ID!): String
  approveRegistration (id: ID!): String
  createAdminUser (email: String! ,password: String!, firstName: String!, lastName: String!, phone: String): UserType
  deleteAdminUser (id: ID!): String
  resetAdminUserPassword (id: ID!, password: String!): String
}

`;

module.exports = [queryDefs, userTypeDefs, adminTypeDefs];
