/**
 * @format
 */

import 'react-native';
import React from 'react';
import login  from '../views/Login';
import mockAxios from 'axios';
<<<<<<< HEAD
import * as user from '../src/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
=======
import * as user from '../src/actions';
>>>>>>> master


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
<<<<<<< HEAD
const middlewares = [thunk];
=======
import store from '../src/store';
>>>>>>> master

const mockStore = configureMockStore(middlewares)

// test('Test user login', async () => {
//   const store = mockStore({ user: [] })

//   console.log(user.login());
//   return store.dispatch(user.login({username: '12345', password: '123'}))
//   .then((data) => {
//     expect(data.response.sid).toBe(data.response.sid);
//   });
<<<<<<< HEAD
// })

test('Test user login', async () => {
  dispatch = jest.fn()
  getState = () => {}
  await user.login({username: '12345', password: '123'})(dispatch, getState)
  expect(dispatch.mock.calls[0][0]).toBe({ type: 'SET_USER_INFO', payload: response.data.sid })
  //expect(data.response.sid).toBe(data.response.sid);
})
=======

// test('Test user login', async (dispatch) => {
//   console.log(user.login());
//   return dispatch(user.login({username: '12345', password: '123'}))
//   .then((data) => {
//     expect(data.response.sid).toBe(data.response.sid);
//   });
// })

describe('#TestUsers', () => {
  it('Test user login', () => {
    const users = {
      username: '12345',
      password: '123'
    };
>>>>>>> master

    return store.dispatch(user.login(users.username, users.password))
      .then(() => {
        console.log('TEST signIn SUCCESS');

      })
      .catch((err) => {
        console.log('TEST signIn ERROR =>', err);
      });
    
  });
});

  //<Login username={} setUsername={() => }

  //<Login username={} setUsername={() => }

    // expect(login.loginUser({
    //     email: this.state.username = 'jaap@jaap.nl',
    //     password: this.state.password = 'hoi123'}
        
    // )).toEqual(response);
