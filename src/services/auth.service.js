import { Auth, API } from 'aws-amplify';
import { logger } from '@/lib/logger';

const AuthService = {
  getUser: async function () {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user && user.signInUserSession) {
          return user;
        }
        return null;
      })
      .catch(() => null);
  },
  updateUserAttributes: async function (cognitoUser, user) {
    return Auth.updateUserAttributes(cognitoUser, user)
      .then((res) => {
        logger.debug('Auth update user attributes success', res);
      })
      .catch((e) => {
        logger.debug('Auth update user attributes failed', e);
        throw e;
      });
  },
  getAuthBusinessData: async function (limit, nextToken) {
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = {
      queryStringParameters: {
        limit: limit,
        token: nextToken,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return API.get(apiName, path, myInit);
  },
  currentUserInfo: async function () {
    return Auth.currentUserInfo();
  },
};

export default AuthService;
