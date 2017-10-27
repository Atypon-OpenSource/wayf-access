const userTypeDefs = `
scalar GenericObject

scalar JSON

type DeviceType {
  id: ID!
  userAgent: String!
  device: JSON
  browser: JSON
  os: JSON
  latestActivity: PublisherActivityType
}

type PublisherActivityType {
  activityDate: String
  publisherName: String
  publisherId: ID
}


type IdpType {
  lastActiveDate: String
  id: ID!
  name: String!
  logoUrl: String
  frequency: Float!
  type: IdpTypeEnum!
}

enum IdpTypeEnum {
  SAML
  OAUTH
  OPEN_ATHENS
}

type ActivityType {
  id: ID!
  publisherId: String!
  publisherName: String!
  date: String!
  action: ActivityActionEnum!
  data: ActivityDataType
}

enum ActivityActionEnum {
  REMOVE_IDP
  READ_IDP_HISTORY
  ADD_IDP
}

type ActivityDataType {
  type: String
  id: String
  name: String
}
`;

module.exports = userTypeDefs;
