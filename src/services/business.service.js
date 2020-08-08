import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import { createBusiness } from '@/graphql/mutations';
import { getBusiness } from '@/graphql/queries';
import { shortid } from '@/lib/shortId';
import { logger } from '@/lib/logger';

export const getBusinessNameByShortId = /* GraphQL */ `
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
        businessName
      }
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
      postcode
      address
      data
    }
  }
`;

const BusinessService = {
  uniqueShortId: async function () {
    let checkId = shortid.generate();
    let unique = false;
    while (!unique) {
      const ids = await this.lookupShortId(checkId);
      if (ids.length === 0) {
        return checkId;
      } else {
        checkId = shortid.generate();
      }
    }
  },
  getBusinessShortId: async function (id) {
    if (id === null) return null;
    const getParams = {
      shortId: id,
    };
    // API_KEY Auth mode used for public endpoints
    return API.graphql({
      query: getBusinessNameByShortId,
      variables: getParams,
      authMode: 'API_KEY',
    })
      .then((res) => {
        logger.debug('found business', res);

        return _.get(res, 'data.byShortId.items[0]', 404);
      })
      .catch((e) => {
        logger.debug('Business service failed to get', e);
        return null;
      });
  },
  lookupShortId: async function (id) {
    if (id === null) return null;
    const getParams = {
      shortId: id,
    };
    return API.graphql(graphqlOperation(getBusinessNameByShortId, getParams))
      .then((res) => {
        logger.debug('found business', res);
        return _.get(res, 'data.byShortId.items');
      })
      .catch((e) => {
        logger.debug('Business service failed to get', e);
        return null;
      });
  },
  getBusiness: async function (id) {
    if (id === null) return null;
    const getParams = {
      id: id,
    };
    return API.graphql(graphqlOperation(getBusiness, getParams))
      .then((res) => {
        logger.debug('found business', res);
        return res.data.getBusiness;
      })
      .catch((e) => {
        logger.debug('Business service failed to get', e);
        return null;
      });
  },
  upsert: async function (business, attributes) {
    const UpsertParams = {
      input: {
        ...attributes,
      },
      done: true,
    };
    if (!business) {
      return API.graphql(graphqlOperation(createBusiness, UpsertParams))
        .then((res) => {
          logger.debug('Business create success', res);
          return res.data.createBusiness;
        })
        .catch((e) => {
          logger.debug('Business create failed', e);
          throw e;
        });
    } else {
      return API.graphql(graphqlOperation(updateBusiness, UpsertParams))
        .then((res) => {
          logger.debug('Business update success', res);
          return res.data.updateBusiness;
        })
        .catch((e) => {
          logger.debug('Business update failed', e);
          throw e;
        });
    }
  },
};

export default BusinessService;
