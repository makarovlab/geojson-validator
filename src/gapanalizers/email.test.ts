import {describe, expect, test} from '@jest/globals';
import {isEmailPresented} from './email';

describe('email gap analyzer', () => {
  test('blank email attribute', () => {
    expect(isEmailPresented("")).toBe(false);
  });

  test('single string input', () => {
    /**
     * function must not validate email,
     * just check if attribute presented
     */
    expect(isEmailPresented("not structured string")).toBe(true);
  });

  test('array of strings input', () => {
    const emailList = ['example@mail.com', 'secondexample@mail.com'];
    expect(isEmailPresented(emailList)).toBe(true);
  });

  test('email that contains Customer Service object', () => {
    const emailObject = {
        'Customer Service': [
            'example@mail.com', 
            'secondexample@mail.com'
        ]
    };
    expect(isEmailPresented(emailObject)).toBe(true);
  });
});