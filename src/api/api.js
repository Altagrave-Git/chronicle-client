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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
    return response;
  }
}

class BaseContentAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/projects/';
  }

  projects = async () => {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log(error));
    return response;
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
    return response;
  }
}

class BaseMailAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/messages/';
  }

  get = async (token) => {
    const response = await fetch(this.baseUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.log(err));
    return response;
  }

  post = async (form) => {
    const response = await fetch(this.baseUrl + "send/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.log(err));
    return response;
  }

  check = async (token) => {
    const response = await fetch(this.baseUrl + "check/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.log(err));
    return response;
  }

  read = async (token, id) => {
    const response = await fetch(this.baseUrl + `${id}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .catch(err => console.log(err));
    return response;
  }
}

class BaseBlogAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_CHRONICLE_URL + '/blog/';
  }

  getCategories = async () => {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log(error));
    return response;
  }

  createCategory = async(token, form) => {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log(error));
    return response;
  }

  updateCategory = async(token, form, category) => {
    const response = await fetch(this.baseUrl + `${category}/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log(error));
    return response;
  }

  deleteCategory = async(token, category) => {
    const response = await fetch(this.baseUrl + `${category}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }})
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
    return response;
  }

  getPosts = async (category='all') => {
    const response = await fetch(this.baseUrl + `${category}/posts/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      });
    return response;
  }

  createPost = async (token, form, category) => {
    const response = await fetch(this.baseUrl + `${category}/posts/`, {
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
      .catch(error => console.log(error));
    return response;
  }

  updatePost = async (token, form, category, slug) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/`, {
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
      .catch(error => console.log(error));
    return response;
  }

  deletePost = async (token, category, slug) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
    return response;
  }

  getContent = async (category, slug) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .catch(error => console.log(error));
    return response;
  }

  createContent = async (token, form, category, slug, type) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/${type}/`, {
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
      .catch(error => console.log(error));
    return response;
  }

  updateContent = async (token, form, category, slug, type, id) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/${type}/${id}/`, {
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
      .catch(error => console.log(error));
    return response;
  }

  deleteContent = async (token, category, slug, type, id) => {
    const response = await fetch(this.baseUrl + `${category}/posts/${slug}/${type}/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
    return response;
  }
}


const AuthAPI = new BaseAuthAPI();

export const ContentAPI = new BaseContentAPI();

export const MailAPI = new BaseMailAPI();

export const BlogAPI = new BaseBlogAPI();

export default AuthAPI;