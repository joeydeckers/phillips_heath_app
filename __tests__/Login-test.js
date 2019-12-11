/**
 * @format
 */

import 'react-native';
import React from 'react';
import login  from '../views/Login';
import mockAxios from 'axios';
import * as user from '../src/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares)

// test('Test user login', async () => {
//   const store = mockStore({ user: [] })

//   console.log(user.login());
//   return store.dispatch(user.login({username: '12345', password: '123'}))
//   .then((data) => {
//     expect(data.response.sid).toBe(data.response.sid);
//   });
// })

test('Test user login', async () => {
  dispatch = jest.fn()
  getState = () => {}
  await user.login({username: '12345', password: '123'})(dispatch, getState)
  expect(dispatch.mock.calls[0][0]).toBe({ type: 'SET_USER_INFO', payload: response.data.sid })
  //expect(data.response.sid).toBe(data.response.sid);
})



  //<Login username={} setUsername={() => }

  //<Login username={} setUsername={() => }

    // expect(login.loginUser({
    //     email: this.state.username = 'jaap@jaap.nl',
    //     password: this.state.password = 'hoi123'}
        
    // )).toEqual(response);
