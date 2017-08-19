export function authorizeUserSuccess(data)  {
    return { type: "AUTH_USER_SUCCESS", data};
};

export function userDetailSuccess(users)  {
    return { type: "USER_DETAIL_SUCCESS", users};
};

export function saveUserSuccess(user)  {
    return { type: "SAVE_USER_SUCCESS", user};
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

export function saveUser(user) {
    var token = localStorage.getItem('appAccessToken');
    return function (dispatch) {
        fetch('http://localhost:8081/api/saveUser', { 
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token' : token
            },
            body: JSON.stringify({
              "name": user
            })
        })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
         dispatch(fetchUserDetails());
      });
    };
}
