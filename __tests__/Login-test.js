/**
 * @format
 */

import 'react-native';
import React from 'react';
import login  from '../views/Login';
import mockAxios from 'axios';
import * as user from '../src/actions'


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


// it('should call a loginUser function', done => {


//     // console.log(login);
//     // loginUser().then(response => {
//     //   expect(response).toEqual({
//     //     data: {},
//     //   });
//     // });
//     // expect(mockAxios.request).toHaveBeenCalledWith({
//     //   method: 'post',
//     //   url: 'http://hypefash.com/public/api/v1/client/login'
//     // });
//     // expect(mockAxios.request).toHaveBeenCalledTimes(1);
//     // expect(consoleErrorSpy).not.toHaveBeenCalled();
//     // done();
    
//   });

test('Test user login', async (dispatch) => {
  console.log(user.login());
  return dispatch(user.login({username: '12345', password: '123'}))
  .then((data) => {
    expect(data.response.sid).toBe(data.response.sid);
  });
})




  //<Login username={} setUsername={() => }

    // expect(login.loginUser({
    //     email: this.state.username = 'jaap@jaap.nl',
    //     password: this.state.password = 'hoi123'}
        
    // )).toEqual(response);
