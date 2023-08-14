import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";
import { ReactComponent as Delete } from "../../icons/trash.svg";

const BlogSnippetForm = ({ post, token, order, setApiCall, edit=-1, setEdit, formType='', setFormType, text='', title='', language='', style='', id=false }) => {
  const { category, slug } = useParams();
  const [textData, setTextData] = useState(text);
  const [deleteModal, setDeleteModal] = useState(false);
  const [titleData, setTitleData] = useState(title != null ? title : '');
  const [styleData, setStyleData] = useState(style);
  const [languageData, setLanguageData] = useState(language);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('type', 'snippet');
    formData.append('order', order);
    formData.append('post', post.id);
    formData.append('text', textData);
    formData.append('style', styleData);
    formData.append('language', languageData);
    formData.append('title', titleData);

    if (id) {
      formData.append('id', id);
      BlogAPI.updateContent(token, formData, category, slug, 'snippet', id)
        .then((data) => {
          setApiCall(true);
        })
        .catch(error => console.log(error));

    } else {
      BlogAPI.createContent(token, formData, category, slug, 'snippet')
        .then(() => setApiCall(true))
        .catch(error => console.log(error));
    }
  }

  const handleDelete = async () => {
    BlogAPI.deleteContent(token, category, slug, 'snippet', id)
      .then(() => setApiCall(true))
      .catch(error => console.log(error));
  }

  console.log(edit, formType);

  return (
    <>
    <div className=""></div>
    <form className="blogform" onSubmit={handleSubmit}>
      <div className="blog-input-main">
        <input className="blog-input-text" type="text" name="title" id="title" value={titleData} onChange={e => setTitleData(e.target.value)} placeholder="Title" />

        <textarea className="blog-input-text" type="text" name="text" id="text" rows={5} value={textData} onChange={e => setTextData(e.target.value)} placeholder="Start writing..." />

        <div className="blogform-row">
          <select className="blog-input-select" name="language" id="language" defaultValue={language} onChange={e => setLanguageData(e.target.value)}>
            <option style={{textAlign: "center"}} value="">--- LANGUAGE ---</option>
            { post.language_choices.length > 0 &&
              post.language_choices.map((choice, index) => {
                return <option key={index} value={choice[0]}>{choice[1]}</option>
              })
            }
          </select>

          <select className="blog-input-select" name="style" id="style" defaultValue={style} onChange={e => setStyleData(e.target.value)}>
            <option style={{textAlign: "center"}} value="">--- STYLE ---</option>
            { post.style_choices.length > 0 &&
              post.style_choices.map((choice, index) => {
                return <option key={index} value={choice[0]}>{choice[1]}</option>
              })
            }
          </select>
        </div>
      </div>

      <div className="blog-input-save">
        <button type='button' className="blog-btn-cancel" onClick={ formType && formType.length > 0 ? (e) => {
          e.preventDefault()
          setFormType('');
        }:(e) => {
          e.preventDefault();
          setEdit(-1);
          }}><Cancel /></button>
        { edit >= 0 &&
          <button type="button" className="blog-btn-delete" onClick={() => setDeleteModal(true)}><Delete /></button>
        }
        <button type="submit" className="blog-btn-save"><Accept /></button>
      </div>
    </form>
    
    { deleteModal === true &&
      <div className="verify-delete-container">
        <div className="verify-delete">
          <h3>Are you sure you want to delete this?</h3>
          <div className="verify-delete-btns">
            <input type="button" className="verify-delete-yes" value="Yes" onClick={handleDelete} />
            <input type="button" className="verify-delete-no" value="No" onClick={() => setDeleteModal(false)} />
          </div>
        </div>
      </div>

    }
    </>
  )
}

export default BlogSnippetForm;