/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrace = /* GraphQL */ `
  query GetTrace($id: ID!) {
    getTrace(id: $id) {
      id
      firstName
      lastName
      phone
      businessId
      data
      owner
      createdAt
      updatedAt
      business {
        id
        shortId
        businessName
        email
        postcode
        address
        data
        traces {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
    }
  }
`;
export const listTraces = /* GraphQL */ `
  query ListTraces(
    $filter: ModelTraceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTraces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        phone
        businessId
        data
        owner
        createdAt
        updatedAt
        business {
          id
          shortId
          businessName
          email
          postcode
          address
          data
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;

export const traceByBusinessId = /* GraphQL */ `
  query TraceByBusinessId(
    $businessId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTraceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    traceByBusinessId(
      businessId: $businessId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        lastName
        phone
        businessId
        data
        owner
        createdAt
        updatedAt
        business {
          id
          shortId
          businessName
          email
          postcode
          address
          data
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const listBusinesss = /* GraphQL */ `
  query ListBusinesss(
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinesss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shortId
        businessName
        email
        postcode
        address
        data
        traces {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      shortId
      businessName
      email
      postcode
      address
      data
      traces {
        items {
          id
          firstName
          lastName
          phone
          businessId
          data
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const byShortId = /* GraphQL */ `
  query ByShortId(
    $shortId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byShortId(
      shortId: $shortId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        shortId
        businessName
        email
        postcode
        address
        data
        traces {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
