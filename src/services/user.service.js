import _ from 'lodash';

const UserService = {
  // Check if the profile has been fully filled out
  isProfileFilled: function (user) {
    const requiredAttributes = [
      'address',
      'custom:businessName',
      'custom:postcode',
      'custom:state',
      'email',
    ];
    let isFilled = true;
    // Only checks if the key exists
    requiredAttributes.forEach((attribute) => {
      if (!_.has(user.attributes, attribute)) {
        isFilled = false;
      }
    });
    return isFilled;
  },
};

export default UserService;
