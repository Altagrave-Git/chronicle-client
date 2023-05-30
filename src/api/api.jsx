import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// class BaseAuthAPI {
//   constructor() {
//     this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/u/';
//   }

//   authorize = async () => {
//     const response = await axios.get(this.baseUrl + 'auth/')
//       .then(response => {
//         console.log(response.data.auth_url);
//         // redirect to auth url returned from response
//         location.href = response.data.auth_url;
//       })
//       .catch(err => {
//         console.log(err);
//       }
//     );
//   }

//   login = async (code) => {
//     const response = await axios.post(this.baseUrl + 'auth/', { code })
//       .then(response => {
//         console.log(response.data);
//         return response.data;
//       })
//       .catch(err => {
//         console.log(err);
//       }
//     );
//     return response;
//   }
// }

// const AuthAPI = new BaseAuthAPI();

class BaseAuthAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/u/';
  }

  authorize = async () => {
    const response = await fetch(this.baseUrl + 'auth/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        // redirect to auth url returned from response
        location.href = data.auth_url;
      })
      .catch(err => {
        console.log(err);
      }
    );
  }

  login = async (code) => {
    const response = await fetch(this.baseUrl + 'auth/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => {
        console.log(err);
      }
    );
    return response;
  }
}

const AuthAPI = new BaseAuthAPI();

export default AuthAPI;