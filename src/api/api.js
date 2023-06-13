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

  editProject = async (token, form, id) => {
    const response = await fetch(this.baseUrl + `${id}/`, {
      method: 'PUT',
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

  deleteProject = async (token, id) => {
    const response = await fetch(this.baseUrl + `${id}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

  section = async(token, id, form) => {
    const response = await fetch(this.baseUrl + `${id}/sections/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }

  editSection = async(token, pid, sid, form) => {
    const response = await fetch(this.baseUrl + `${pid}/sections/${sid}/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }

  deleteSection = async(token, pid, sid) => {
    const response = await fetch(this.baseUrl + `${pid}/sections/${sid}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
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

  video = async (token, id, form) => {
    const response = await fetch(this.baseUrl + `${id}/videos/`, {
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

  tech = async(token, id, form) => {
    const response = await fetch(this.baseUrl + `${id}/tech/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }

  snippet = async(token, id, form) => {
    const response = await fetch(this.baseUrl + `${id}/code/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }

  editSnippet = async(token, pid, sid, form) => {
    const response = await fetch(this.baseUrl + `${pid}/code/${sid}/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }

  deleteSnippet = async(token, pid, sid) => {
    const response = await fetch(this.baseUrl + `${pid}/code/${sid}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
    return response;
  }
}

const AuthAPI = new BaseAuthAPI();

export const ContentAPI = new BaseContentAPI();

export default AuthAPI;