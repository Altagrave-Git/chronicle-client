import './forms.scss';
import { useState, useEffect } from 'react';
import { ContentAPI } from '../../api/api';

const ProjectForm = ({token, portfolioData, activeIndex}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [site, setSite] = useState('');
  const [repo, setRepo] = useState('');
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [order, setOrder] = useState(0);
  const [mode, setMode] = useState(false);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (mode == true) {
      setName(portfolioData[activeIndex].name);
      setCategory(portfolioData[activeIndex].category);
      setDescription(portfolioData[activeIndex].description);
      setSite(portfolioData[activeIndex].site);
      setRepo(portfolioData[activeIndex].repo);
      try {
        setOrder(portfolioData[activeIndex].order);
      } catch {
        setOrder(0);
      }
    } else {
      setName('');
      setCategory('');
      setDescription('');
      setSite('');
      setRepo('');
      setOrder(0);
    }
  }, [mode])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("site", site);
    formData.append("repo", repo);
    formData.append("order", order);
    if (image != null) {
      formData.append("image", image);
    }
    if (logo != null) {
      formData.append('logo', logo);
    }


    ContentAPI.project(token, formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("site", site);
    formData.append("repo", repo);
    formData.append("order", order);
    if (image != null) {
      formData.append("image", image);
    }
    if (logo != null) {
      formData.append("logo", logo);
    }
    const id = portfolioData[activeIndex].id;

    ContentAPI.editProject(token, formData, id)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  const handleDelete = () => {
    if (verify) {
      ContentAPI.deleteProject(token, portfolioData[activeIndex].id)
      .then(() => location.reload())
      .catch(error => console.log(error));
    } else {
      setVerify(true);
    }
  }

  // switch between POST and PUT
  const switchMode = () => {
    if (mode == false) {
      setMode(true);
    } else {
      setMode(false)
    }
  }

  return (
    <form onSubmit={mode ? handleEdit : handleSubmit}>
      <div className="form-title-container">
        <input type="button" id="form-left" onClick={() => switchMode()} />
        { mode ?
        <h1 className="title-2">Edit Project</h1>
        :
        <h1 className="title-2">Add Project</h1>
        }
        <input type="button" id="form-right" onClick={() => switchMode()} />
      </div>
      <input type="text" name="name" className="form-text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} autoComplete="false" />
      <input type="text" name="category" className="form-text" placeholder="Software Category" value={category} onChange={e => setCategory(e.target.value)} />
      <textarea name="description" className="form-text" placeholder="Project Description"  cols="30" rows="8" required={false} value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <input type="url" name="site" className="form-text" placeholder="Website" required={false} value={site} onChange={e => setSite(e.target.value)} />
      <input type="url" name="repo" className="form-text" placeholder="Repository" required={false} value={repo} onChange={e => setRepo(e.target.value)} />
      <div className="inline-form-text">
        <label htmlFor="order">Order:</label>
        <input className="form-text" type="number" name="order" id="order" value={order} onChange={e => setOrder(e.target.value)} />
      </div>
      <div className="form-image-container">
        <label htmlFor="project-image">Image:</label>
        <input type="file" accept='image/*' name='image' id="project-image" onChange={e => setImage(e.target.files[0])} />
      </div>
      <div className="form-image-container">
        <label htmlFor="project-logo">Logo:</label>
        <input type="file" accept='image/*' name='logo' id="project-logo" onChange={e => setLogo(e.target.files[0])} />
      </div>
      <div className="submit-container">
      { mode &&
        <input type="button" className="form-submit" id="delete" value="Delete" onClick={() => handleDelete()} />
      }
      { name.length && category.length && description.length ?
        <button type="submit" className="form-submit" id="submit">Submit</button>
        :
        <button type="submit" className="form-submit" id="submit" disabled>Submit</button>
      }
      </div>
      { verify &&
      <div className="verify-delete-container">
        <div className="verify-delete">
          <h3>Are you sure you want to delete this project?</h3>
          <div className="verify-delete-btns">
            <input type="button" className="verify-delete-yes" value="Yes" onClick={() => handleDelete()} />
            <input type="button" className="verify-delete-no" value="No" onClick={() => setVerify(false)} />
          </div>
        </div>
      </div>
      }
    </form>
  )
}

export default ProjectForm;