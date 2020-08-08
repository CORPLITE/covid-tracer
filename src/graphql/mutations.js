/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
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
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
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
export const deleteBusiness = /* GraphQL */ `
  mutation DeleteBusiness(
    $input: DeleteBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    deleteBusiness(input: $input, condition: $condition) {
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
export const updateTrace = /* GraphQL */ `
  mutation UpdateTrace(
    $input: UpdateTraceInput!
    $condition: ModelTraceConditionInput
  ) {
    updateTrace(input: $input, condition: $condition) {
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
export const deleteTrace = /* GraphQL */ `
  mutation DeleteTrace(
    $input: DeleteTraceInput!
    $condition: ModelTraceConditionInput
  ) {
    deleteTrace(input: $input, condition: $condition) {
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
export const createTrace = /* GraphQL */ `
  mutation CreateTrace(
    $input: CreateTraceInput!
    $condition: ModelTraceConditionInput
  ) {
    createTrace(input: $input, condition: $condition) {
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
