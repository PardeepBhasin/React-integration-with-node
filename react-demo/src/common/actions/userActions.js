export function authorizeUserSuccess(data)  {
    return { type: "AUTH_USER_SUCCESS", data};
};

export function userDetailSuccess(users)  {
    return { type: "USER_DETAIL_SUCCESS", users};
};

export function authorizeUser(username, password) {
    return function (dispatch) {
        fetch('http://localhost:8081/api/authenticate', { 
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'name': username,
              'password' : password
            }),
        })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
         dispatch(authorizeUserSuccess(body));
      });
    };
}

export function fetchUserDetails() {
    var token = localStorage.getItem('appAccessToken');
    return function (dispatch) {
        fetch('http://localhost:8081/api/users', { 
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : token
            }
        })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
         dispatch(userDetailSuccess(body));
      });
    };
}
