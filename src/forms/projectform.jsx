import './forms.scss';
import { useState } from 'react';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    const submitUrl = import.meta.env.VITE_CHRONICLE_URL + "/projects/"
    const data = {
      name: name,
      category: category
    }
    const response = await fetch(submitUrl, {
      method: 'POST',
      credentials: 'include',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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

  return (
    <form method="POST" encType="application/multidata">
      <h1 className="title">Add Project</h1>
      <input type="text" name="name" className="form-line" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" name="category" className="form-line" placeholder="Software Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input type="button" className="form-submit" value="Submit" onClick={() => handleSubmit()} />
    </form>
  )
}

export default ProjectForm;