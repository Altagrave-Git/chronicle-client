import './forms.scss';
import { useState } from 'react';
import getCookie from '../api/cookie';
import { ContentAPI } from '../api/api';

const ProjectForm = ({token, setFormModal}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [repo, setRepo] = useState('');

  const csrftoken = getCookie('csrftoken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await ContentAPI.project(token,
      {
        name: name,
        category: category,
        description: description,
        site: website,
        repo: repo,
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));
    return response;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Add Project</h1>
      <input type="text" name="name" className="form-text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} autoComplete="false" />
      <input type="text" name="category" className="form-text" placeholder="Software Category" value={category} onChange={e => setCategory(e.target.value)} />
      <textarea name="description" className="form-text" placeholder="Project Description"  cols="30" rows="8" required={false} value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <input type="url" name="site" className="form-text" placeholder="Website" required={false} value={website} onChange={e => setWebsite(e.target.value)} />
      <input type="url" name="repo" className="form-text" placeholder="Repository" required={false} value={repo} onChange={e => setRepo(e.target.value)} />
      { name.length && category.length && description.length ?
        <button type="submit" className="form-submit">Submit</button>
        :
        <button type="submit" className="form-submit" disabled>Submit</button>
      }
      
    </form>
  )
}

export default ProjectForm;