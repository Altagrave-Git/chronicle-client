import './forms.scss';
import { useState } from 'react';
import { ContentAPI } from '../api/api';

const ImageForm = ({token, portfolioData, activeIndex}) => {
  const [project, setProject] = useState(portfolioData[activeIndex].id);
  const [image, setImage] = useState(null);
  const [type, setType] =  useState(null);

  console.log([project, image, type]);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('project', String(project));
    formData.append('type', type);

    ContentAPI.image(token, project, formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Add Image</h1>
      <input className="form-text" type="file" accept='image/*' name='image' onChange={e => setImage(e.target.files[0])} />
      <label className="form-text" htmlFor="imagetypes" >Image type:</label>
      <select className="form-text" name="type" id="imagetypes" onChange={e => {
        if (e.target.value.length) {
          setType(e.target.value);
        } else {
          setType(null);
        }
      }}>
        <option value=''>--select type--</option>
        <option value="desktop-display">Desktop</option>
        <option value="mobile-display">Mobile</option>
        <option value="logo">Logo</option>
        <option value="other">Other</option>
      </select>
      { image && type ?
        <button type="submit" className="form-submit">Submit</button>
        :
        <button type="submit" className="form-submit" disabled>Submit</button>
      }
      
    </form>
  )
}

export default ImageForm;