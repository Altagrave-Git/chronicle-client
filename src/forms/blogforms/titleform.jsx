import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";

const BlogTitleForm = ({ post, token, order, setApiCall, edit=-1, setEdit, formType='', setFormType, text='', size='m', id=false }) => {
  const { category, slug } = useParams();
  const [textData, setTextData] = useState(text);
  const [sizeData, setSizeData] = useState(size);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('type', 'title');
    formData.append('order', order);
    formData.append('post', post.id);
    formData.append('text', textData);
    formData.append('size', sizeData);

    if (id) {
      formData.append('id', id);
    }

    BlogAPI.postContent(token, formData, category, slug)
      .then(data => {
        console.log(data);
        setApiCall(true);
        setEdit(false);
      })
      .catch(error => console.log(error));
  }

  console.log(sizeData);

  return (
    <form className="blogform" onSubmit={handleSubmit}>
      <div className="blog-input-main">
        <input className={`blog-input-text ${sizeData}`} type="text" name="text" id="text" value={textData} onChange={e => setTextData(e.target.value)} placeholder="Title" />

        <select className="blog-input-select" name="size" id="size" defaultValue={size} onChange={e => setSizeData(e.target.value)}>
          <option value="xs">Extra Small</option>
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>

      <div className="blog-input-save">
        <button type='button' className="blog-cancel-btn" onClick={ formType && formType.length > 0 ? (e) => {
          e.preventDefault()
          formType('');
        }:(e) => {
          e.preventDefault();
          setEdit(-1);
          }}><Cancel /></button>
        <button type="submit" className="blog-save-btn"><Accept /></button>
      </div>

    </form>
  )
}

export default BlogTitleForm;