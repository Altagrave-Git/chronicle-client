import './forms.scss';
import { useState } from 'react';
import { ContentAPI } from '../../api/api';

const ImageForm = ({token, portfolioData, activeIndex, setFormModal, setRetrievePortfolio}) => {
  const [project, setProject] = useState(portfolioData[activeIndex].id);
  const [image, setImage] = useState(null);
  const [type, setType] =  useState(null);
  const [section, setSection] = useState("");

  const sections = portfolioData[activeIndex].sections;

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', type);
    formData.append('project', project);
    if (section.length > 0) {
      formData.append("section", section);
    }

    ContentAPI.image(token, project, formData)
      .then(res => {
        setFormModal(null);
        setRetrievePortfolio(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title-2">Add Image</h1>
      <input className="form-text" type="file" accept='image/*' name='image' onChange={e => setImage(e.target.files[0])} />
      <label className="text" htmlFor="imagetypes" >Image type:</label>
      <select className="form-text" name="type" id="imagetypes" onChange={e => {
        if (e.target.value.length) {
          setType(e.target.value);
        } else {
          setType(null);
        }
      }}>
        <option value=''>--- select image type ---</option>
        <option value="desktop-display">Desktop</option>
        <option value="mobile-display">Mobile</option>
        <option value="logo">Logo</option>
        <option value="other">Other</option>
      </select>
      { sections.length > 0 &&
      <>
        <label htmlFor="section">For section (optional):</label>
        <select className="form-text" name="section" id="section" onChange={e => setSection(e.target.value)}>
          <option value="">---------------</option>
          { 
            sections.map((item, index) => <option key={index} value={item.id}>{item.title}</option>)
          }
        </select>
      </>
      }
      { image && type ?
        <button type="submit" className="form-submit">Submit</button>
        :
        <button type="submit" className="form-submit" disabled>Submit</button>
      }
      
    </form>
  )
}

export default ImageForm;