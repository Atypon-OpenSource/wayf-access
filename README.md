# WAYF Cloud Access Server

The Access Server is the main external interface of the WAYF Cloud solution. It provides a GraphQL API which is used by the WAYF Cloud applications suite,
and also plays the role of the proxy server for the WAYF Cloud REST API.

The WAYF Cloud applications suite consists of the following applications
- Admin application: Provides a UI for the management of platform registration requests as well as for the registered platforms
- User application: Used by the end users to view how their data is used and by whom
- Registration application: Allows publishers and service provider platforms to register to the WAYF Cloud


## Stack
### Node, Express.js
The [Express](https://expressjs.com/) framework for [node](https://nodejs.org/en/) is leveraged to provide a lightweight but flexible https server for handling client requests. Static resources can be served and data requests are marshalled to the [Apollo GrpahQL Server](https://github.com/apollographql/apollo-server)
which acts as a client to the WAYF Cloud REST API.

### GraphQL
The [wayf-cloud](https://github.com/Atypon-OpenSource/wayf-cloud) is wrapped with a custom [GraphQL](http://graphql.org/) schema. This provides a layer of abstraction from the core API and integrates with the Ember.js apps.

### Ember JS & Apollo Client
The [Ember JS](https://www.emberjs.com) framework, coupled with the [Apollo GrpahQL Client](https://github.com/apollographql/apollo-client) is used for the development of the WAYF Application Suite.
