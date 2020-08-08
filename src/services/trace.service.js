import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import { listTraces } from '@/graphql/queries';
import { logger } from '@/lib/logger';
import { timezone } from '@/lib/time';

const requestLimit = 2000;

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
      }
      nextToken
    }
  }
`;

const createTrace = /* GraphQL */ `
  mutation CreateTrace(
    $input: CreateTraceInput!
    $condition: ModelTraceConditionInput
  ) {
    createTrace(input: $input, condition: $condition) {
      firstName
      lastName
      phone
      businessId
      data
      owner
      createdAt
      updatedAt
    }
  }
`;

function create(formData, businessId) {
  const params = {
    input: {
      ...formData,
      owner: businessId,
      businessId: businessId,
    },
    done: true,
  };

  return API.graphql({
    query: createTrace,
    variables: params,
    authMode: 'API_KEY',
  });
}

function getUserTraceData({ businessId, nextToken }) {
  const params = {
    businessId: businessId,
    sortDirection: 'DESC',
    limit: requestLimit,
  };
  if (nextToken) params.nextToken = nextToken;

  return API.graphql(graphqlOperation(traceByBusinessId, params))
    .then((res) => {
      logger.debug(`Traces listed`, res);
      const nextToken = _.get(res, 'data.traceByBusinessId.nextToken');
      const traceData = _.get(res, 'data.traceByBusinessId.items', []).map(
        (trace) => ({
          createdAt: timezone(trace.createdAt),
          firstName: trace.firstName,
          lastName: trace.lastName,
          phone: trace.phone,
          businessId: trace.businessId,
        }),
      );
      return { nextToken, traceData };
    })
    .catch((e) => logger.error(`Error creating Trace`, e));
}

function convertTraceCSV(traceData) {
  const headings = ['"Date', 'First Name', 'Last Name', 'Phone"'].join('","');
  const data = traceData
    .map((trace) =>
      [
        `"${trace.createdAt}`,
        trace.firstName,
        trace.lastName,
        `${trace.phone}"`,
      ].join('","'),
    )
    .join('\n');
  return `${headings}\n${data}`;
}

export default {
  requestLimit,
  create,
  getUserTraceData,
  convertTraceCSV,
};
