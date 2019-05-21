import {Validator} from 'vee-validate'

Validator.extend('positive-number', {
  validate: value => {
    return value >= 0
  }
});
