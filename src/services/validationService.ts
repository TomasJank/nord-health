const errorMessages = {
  invalidEmail: 'Invalid e-mail address',
  noPasswordMatch: 'Passwords do not match',
  invalidPassword:
    'Your password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter'
};

const regex = {
  validEmail:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  validPassword: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
};

const validators = {
  repeatPassword(value: string, repeatValue: string) {
    if (!value || value !== repeatValue) {
      return errorMessages.noPasswordMatch;
    }
  },

  password(value: string) {
    if (!value.match(regex.validPassword)) {
      return errorMessages.invalidPassword;
    }
  },
  email(value: string) {
    if (!regex.validEmail.test(value)) {
      return errorMessages.invalidEmail;
    }
  }
};

export default validators;
