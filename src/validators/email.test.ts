import {describe, expect, test} from '@jest/globals';
import {isEmailValid} from './email';

describe('email validator', () => {
  test('blank email attribute', () => {
    expect(isEmailValid("")).toBe(false);
  });

  test('single string input with invalid email', () => {
    expect(isEmailValid("not structured string")).toBe(false);
  });

  test('single string input with correct email', () => {
    expect(isEmailValid("secondexample@mail.com")).toBe(true);
  });

  test('array of strings input', () => {
    const emailList = ['example@mail.com', 'secondexample@mail.com'];
    expect(isEmailValid(emailList)).toBe(true);
  });

  test('email that contains Customer Service object', () => {
    const emailObject = {
        'Customer Service': [
            'example@mail.com', 
            'secondexample@mail.com'
        ]
    };
    expect(isEmailValid(emailObject)).toBe(true);
  });
});