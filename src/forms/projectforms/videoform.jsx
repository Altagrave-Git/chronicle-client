import './forms.scss';
import { useState } from 'react';
import { ContentAPI } from '../../api/api';

const VideoForm = ({token, portfolioData, activeIndex}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState(portfolioData[activeIndex].id);
  const [video, setVideo] = useState(null);
  const [section, setSection] = useState("");

  const sections = portfolioData[activeIndex].sections;

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    formData.append('project', project);
    if (section.length > 0) {
      formData.append("section", section);
    }

    ContentAPI.video(token, project, formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title-2">Add Video</h1>
      <input type="text" className="form-text" name="title" id="video-title" placeholder='Video Title' value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="form-text" name="description" id="description" cols="30" rows="10" placeholder="Video Desciption" value={description} onChange={e => setDescription(e.target.value)} />
      <input className="form-text" type="file" accept='video/*' name='video' onChange={e => setVideo(e.target.files[0])} />
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
      { video ?
        <button type="submit" className="form-submit">Submit</button>
        :
        <button type="submit" className="form-submit" disabled>Submit</button>
      }
      
    </form>
  )
}

export default VideoForm;