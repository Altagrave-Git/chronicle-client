import './forms.scss';
import { useState } from 'react';
import { ContentAPI } from '../api/api';

const ProjectForm = ({token, setFormModal}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [site, setSite] = useState('');
  const [repo, setRepo] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("site", site);
    formData.append("repo", repo);
    formData.append("image", image);

    ContentAPI.project(token, formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Add Project</h1>
      <input type="text" name="name" className="form-text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} autoComplete="false" />
      <input type="text" name="category" className="form-text" placeholder="Software Category" value={category} onChange={e => setCategory(e.target.value)} />
      <textarea name="description" className="form-text" placeholder="Project Description"  cols="30" rows="8" required={false} value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <input type="url" name="site" className="form-text" placeholder="Website" required={false} value={site} onChange={e => setSite(e.target.value)} />
      <input type="url" name="repo" className="form-text" placeholder="Repository" required={false} value={repo} onChange={e => setRepo(e.target.value)} />
      <input className="form-text" type="file" accept='image/*' name='image' onChange={e => setImage(e.target.files[0])} />
      { name.length && category.length && description.length ?
        <button type="submit" className="form-submit">Submit</button>
        :
        <button type="submit" className="form-submit" disabled>Submit</button>
      }
      
    </form>
  )
}

export default ProjectForm;