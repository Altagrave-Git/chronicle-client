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
        return response.json();
      })
      .then(data => {
        // redirect to auth url returned from response
        location.href = data.auth_url;
      })
      .catch(error => {
        console.log(error);
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
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  logout = async (token) => {
    const response = await fetch(this.baseUrl + 'logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ token })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  check = async () => {
    const response = await fetch(this.baseUrl + 'check/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  introspect = async (token) => {
    const response = await fetch(this.baseUrl + 'intro/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }
}

class BaseContentAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/projects/';
  }

  project = async (token, form) => {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: form
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  image = async (token, id, form) => {
    const response = await fetch(this.baseUrl + `${id}/images/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: form
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }
}

const AuthAPI = new BaseAuthAPI();

export const ContentAPI = new BaseContentAPI();

export default AuthAPI;