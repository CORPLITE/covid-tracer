/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrace = /* GraphQL */ `
  subscription OnCreateTrace($owner: String) {
    onCreateTrace(owner: $owner) {
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
export const onUpdateTrace = /* GraphQL */ `
  subscription OnUpdateTrace($owner: String) {
    onUpdateTrace(owner: $owner) {
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
export const onDeleteTrace = /* GraphQL */ `
  subscription OnDeleteTrace($owner: String) {
    onDeleteTrace(owner: $owner) {
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
export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness($owner: String) {
    onCreateBusiness(owner: $owner) {
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
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness($owner: String) {
    onUpdateBusiness(owner: $owner) {
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
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness($owner: String) {
    onDeleteBusiness(owner: $owner) {
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
