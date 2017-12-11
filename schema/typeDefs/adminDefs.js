const adminTypeDefs = `

type UserType {
  id: ID!
  email: String!
  phone: String!
  firstName: String!
  lastName: String!
}

type PublisherInputType {
  name: String!
  emailAddress: String!
  phone: String!
  firstName: String!
  lastName: String!
  url: String
}

type MemberPublisherType {
  id: ID!
  name: String
  code: String
  status: String!
  date: String
  contact: PublisherContactType
  url: String
}

type PublicPublisherType {
  id: ID!
  name: String!
  code: String
  status: String!
  date: String
  url: String
  contact: PublisherContactType
}

type AdminPublisherType {
  id: ID!
  name: String!
  code: String
  status: String!
  date: String
  url: String
  api: PublisherApiType
  contact: PublisherContactType
}

type PublisherApiType {
  widgetUrl: String
  token: String
}

type PublisherContactType {
  id: String
  firstName: String
  lastName: String
  email: String
  phone: String
}

type AdminUserType {
  type: String
  value: String
  validUntil: String
}

`;

module.exports = adminTypeDefs;
