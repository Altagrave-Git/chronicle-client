import './forms.scss';
import { useState, useEffect } from 'react';
import { ContentAPI } from '../api/api';

const SnippetForm = ({token, portfolioData, activeIndex}) => {
  const [section, setSection] = useState(0);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [style, setStyle] = useState('');
  const [language, setLanguage] = useState('');
  const [langChoices, setLangChoices] = useState([]);
  const [styleChoices, setStyleChoices] = useState([]);

  const sections = portfolioData[activeIndex].sections;

  useEffect(() => {
    const url = import.meta.env.VITE_CHRONICLE_URL + `/projects/${portfolioData[activeIndex].id}/code/`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json"
    }})
    .then(res => res.json())
    .then(data => {
      setLangChoices(data.languages);
      setLanguage(data.languages[0][0]);
      setStyleChoices(data.styles);
      setStyle(data.styles[0][0]);
    })
    .catch(err => console.log(err));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const project = portfolioData[activeIndex].id;
    

    const form = {
      project: project,
      project_section: section,
      title: title,
      code: code,
      language: language,
      style: style,
    }

    ContentAPI.snippet(token, project, form)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  const handleEdit = () => {
    return
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title-container">
        <h2 className="title-2">Add Snippet</h2>
      </div>
      <input className="form-text" type="text" name="title" id="title" placeholder="Snippet Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="form-text" name="code" id="code" rows="10" placeholder="Insert code snippet..." value={code} onChange={e => setCode(e.target.value)}></textarea>
      <label className="subtitle-2" htmlFor="language">Language:</label>
      <select className="form-text" name="language" id="language" onChange={e => setLanguage(e.target.value)}>
        { langChoices.length > 0 &&
          langChoices.map((item, index) => {
            return (
              <option className="form-option" key={index} value={item[0]}>{item[1]}</option>
            )
          })
        }
      </select>
      <label className="subtitle-2" htmlFor="style">Style:</label>
      <select className="form-text" name="style" id="style" onChange={e => setStyle(e.target.value)}>
        { styleChoices &&
          styleChoices.map((item, index) => {
            return (
              <option className="form-option" key={index} value={item[0]}>{item[1]}</option>
            )
          })
        }
      </select>

      <label className="subtitle-2" htmlFor="section">Section:</label>
      <select className="form-text" name="section" id="section" onChange={e => setSection(e.target.value)}>
        <option value={0}>------------</option>
        { sections.length > 0 &&
          sections.map((item, index) => {
            return (
              <option key={index} value={item.id}>{item.title}</option>
            )
          })
        }
      </select>

      { code.length > 0 && title.length > 0 && section > 0 ?
      <button className="form-submit" type="submit">Save</button>
      :
      <button className="form-submit" type="submit" disabled>Save</button>
      }
    </form>
  )
}

export default SnippetForm;