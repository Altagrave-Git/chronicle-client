import { useState } from "react";
import "./blogforms.scss"
import { BlogAPI } from "../../api/api";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";
import { ReactComponent as Delete } from "../../icons/trash.svg";

const PostForm = ({categories, token}) => {
  const [category, setCategory] = useState(0);
  const [categorySlug, setCategorySlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    if (addCategory) {
      BlogAPI.createCategory(token, { name: newCategory })
        .then(data => {
          console.log(data);
          formData.append("category", data.id);
          BlogAPI.createPost(token, formData, data.slug)
            .then(data => {
              console.log(data);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    } else {
      formData.append("category", category)
      BlogAPI.createPost(token, formData, categorySlug)
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }

  return (
    <form className="blogform" onSubmit={handleSubmit}>
      <div className="blog-input-main" style={{margin: "0.5rem 1rem"}}>
        <input type="file" accept="image/*" name="image" className="blog-image-input" onChange={(e) => setImage(e.target.files[0])} />
        <input type="text" name="title" className="blog-input-text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea name="description" className="blog-input-text" cols="30" rows="5" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        { addCategory ?
          <input type="text" name="category" placeholder="Category" className="form-text" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
        :
          <select className="blog-input-select" name="category" onChange={e => {
            setCategory(e.target.value.split(" ")[0]);
            setCategorySlug(e.target.value.split(" ")[1]);
          }}>
            <option value={null}>--- category ---</option>
            { categories && categories.length > 0 &&
              categories.map((item, index) => {
                return <option key={index} value={`${item.id} ${item.slug}`}>{item.name}</option>
              })
            }
          </select>
        }
        <div style={{width: 'fit-content'}} className="form-row">
          <input type="radio" onClick={() => setAddCategory(false)} style={{marginRight: '1rem'}} name="category-type" id="cat-change" defaultChecked />
          <label htmlFor="cat-change">Existing Category</label>
        </div>
        <div style={{width: 'fit-content'}} className="form-row">
          <input type="radio" onClick={() => setAddCategory(true)} style={{marginRight: '1rem'}} name="category-type" id="cat-new" />
          <label htmlFor="cat-new">New Category</label>
        </div>
      </div>
      
      <div className="blog-input-save">
        <button type='button' className="blog-btn-cancel"><Cancel /></button>
        <button type="button" className="blog-btn-delete" onClick={() => setDeleteModal(true)}><Delete /></button>
        <button type="submit" className="blog-btn-save"><Accept /></button>
      </div>
    </form>
  )
}

export default PostForm;