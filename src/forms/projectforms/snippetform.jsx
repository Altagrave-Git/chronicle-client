import './forms.scss';
import { useState, useEffect } from 'react';
import { ContentAPI } from '../../api/api';

const SnippetForm = ({token, portfolioData, activeIndex, setFormModal, setRetrievePortfolio}) => {
  const [section, setSection] = useState(0);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [style, setStyle] = useState('');
  const [language, setLanguage] = useState('');
  const [langChoices, setLangChoices] = useState([]);
  const [styleChoices, setStyleChoices] = useState([]);
  const [mode, setMode] = useState(0);
  const [verify, setVerify] = useState(false);

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

  useEffect(() => {
    const snippets = portfolioData[activeIndex].snippets;
    if (mode > 0) {
      setSection(snippets[mode - 1].project_section);
      setTitle(snippets[mode - 1].title);
      setCode(snippets[mode - 1].code);
      setStyle(snippets[mode - 1].style);
      setLanguage(snippets[mode - 1].language);
      document.querySelector("#language").value = portfolioData[activeIndex].snippets[mode - 1].language;
      document.querySelector("#style").value = portfolioData[activeIndex].snippets[mode - 1].style;
      document.querySelector("#section").value = portfolioData[activeIndex].snippets[mode - 1].project_section;
    } else {
      setSection(0);
      setTitle('');
      setCode('');
      setStyle('');
      setLanguage('');
    }
  }, [mode])

  const switchModeLeft = () => {
    const snippets = portfolioData[activeIndex].snippets;
    if (mode > 0) {
      setMode(mode - 1);
    } else {
      setMode(snippets.length);
    }
  }

  const switchModeRight = () => {
    const snippets = portfolioData[activeIndex].snippets;
    if (snippets.length > mode) {
      setMode(mode + 1);
    } else {
      setMode(0);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const pid = portfolioData[activeIndex].id;
    const sid = portfolioData[activeIndex].snippets[mode - 1].id;
    
    const form = {
      project: pid,
      project_section: section,
      title: title,
      code: code,
      language: language,
      style: style,
    }

    ContentAPI.editSnippet(token, pid, sid, form)
    .then(res => {
      setFormModal(null);
      setRetrievePortfolio(true);
    })
    .catch(err => console.log(err));
  }

  const handleDelete = () => {
    if (verify) {
      const pid = portfolioData[activeIndex].id;
      const sid = portfolioData[activeIndex].snippets[mode - 1].id;

      ContentAPI.deleteSnippet(token, pid, sid)
      .then(res => {
        setFormModal(null);
        setRetrievePortfolio(true);
      })
      .catch(err => console.log(err));
    } else {
      setVerify(true);
    }
  }

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
    .then(res => {
      setFormModal(null);
      setRetrievePortfolio(true);
    })
    .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ mode == 0 ? handleSubmit : handleEdit }>
      <div className="form-title-container">
      <input type="button" id="form-left" onClick={() => switchModeLeft()} />
        { mode ?
        <h1 className="title-2">Edit Snippet</h1>
        :
        <h1 className="title-2">Add Snippet</h1>
        }
        <input type="button" id="form-right" onClick={() => switchModeRight()} />
      </div>
      <input className="form-text" type="text" name="title" id="title" placeholder="Snippet Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="form-text" name="code" id="code" rows="10" placeholder="Insert code snippet..." value={code} onChange={e => setCode(e.target.value)}></textarea>
      <label className="subtitle-2" htmlFor="language">Language:</label>
      <select className="form-text" name="language" id="language" onChange={e => setLanguage(e.target.value)}>
        { langChoices.length > 0 &&
          langChoices.map((item, index) => {
            return (
              <option className="form-option" key={index} id={`lang-${item[0]}`} value={item[0]}>{item[1]}</option>
            )
          })
        }
      </select>
      <label className="subtitle-2" htmlFor="style">Style:</label>
      <select className="form-text" name="style" id="style" onChange={e => setStyle(e.target.value)}>
        { styleChoices &&
          styleChoices.map((item, index) => {
            return (
              <option className="form-option style-option" key={index} id={`style-${item[0]}`} value={item[0]}>{item[1]}</option>
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
      <div className="submit-container">
        { mode > 0 &&
          <input type="button" className="form-submit" id="delete" value="Delete" onClick={() => handleDelete()} />
        }
        { code.length > 0 && title.length > 0 && section > 0 ?
        <button className="form-submit" type="submit">Save</button>
        :
        <button className="form-submit" type="submit" disabled>Save</button>
        }
      </div>
      { verify &&
      <div className="verify-delete-container">
        <div className="verify-delete">
          <h3>Are you sure you want to delete this snippet?</h3>
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

export default SnippetForm;