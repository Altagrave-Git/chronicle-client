import './blogdetail.scss';
import { BlogAPI } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogTitleForm from '../../forms/blogforms/titleform';
import BlogParagraphForm from '../../forms/blogforms/paragraphform';
import BlogSnippetForm from '../../forms/blogforms/snippetform';
import BlogImageForm from '../../forms/blogforms/imageform';
import BlogVideoForm from '../../forms/blogforms/videoform';

const BlogDetail = ({ slug, category, categories, admin, token }) => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [count, setCount] = useState(0);
  const [addTypes, setAddTypes] = useState(false);
  const [formType, setFormType] = useState(false);
  const [apiCall, setApiCall] = useState(true);

  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    if (apiCall) {
      BlogAPI.getContent(category, slug)
        .then((data) => {
          const { titles, paragraphs, snippets, images, videos, ...postData } = data;
          const contentData = [...titles, ...paragraphs, ...snippets, ...images, ...videos];
          contentData.sort((a, b) => a.order - b.order);
          setContent(contentData);
          setPost(postData);
          setCount(contentData.length);
        })
        .catch(error => console.log(error));
        setApiCall(false);
    }
  }, [apiCall])

  console.log(post);
  console.log(content);
  console.log(formType);
  console.log(edit);

  return (
    <div className="blog-detail">
      { Object.keys(post).length > 0 ?
        <div className="blog-detail-head">
          <h2 className='blog-detail-head-category'>[ {post.category_name[0].toLowerCase() + post.category_name.slice(1)} ]</h2>
          <h1 className='blog-detail-head-title'>{post.title}</h1>
          <p>Published on {post.pub_date}</p>
          <img src={baseUrl + post.image} alt="blog display image" />
        </div>
        :
        <h1>Loading...</h1>
      }
      { content && content.length > 0 ?
        <div className='blog-detail-body'>
          {
            content.map((item, index) => {
              return (
                <div key={index} onClick={ admin && edit ? () => {
                  setEdit(item.order);
                }:null}>
                { item.type == 'title' &&
                  <>
                  { item.order === edit ?
                    <BlogTitleForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} text={item.text} size={item.size} />
                    :
                    <h3 className={`blog-detail-body-title ${item.size}`}>{item.text}</h3>
                  }
                  </>
                }
                { item.type == 'paragraph' &&
                  <>
                  { item.order === edit ?
                    <BlogParagraphForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} />
                    :
                    item.text.split('\n').map((pg, index) => {
                      return <p key={index}>{pg}</p>
                    })
                  }
                  </>
                }
                { item.type == 'snippet' &&
                  <>
                  { item.order === edit ?
                    <BlogSnippetForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} />
                    :
                    <div className='blog-detail-body-snippet' dangerouslySetInnerHTML={{__html: item.code}} />
                  }
                  </>
                }
                { item.type == 'image' &&
                  <>
                  { item.order === edit ?
                    <BlogImageForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} />
                    :
                    <img src={baseUrl + item.image} alt="blog image item" />
                  }
                  </>
                }
                { item.type == 'video' &&
                  <>
                  { item.order === edit ?
                    <BlogVideoForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} />
                    :
                    <video src={baseUrl + item.video} type="video/mp4" controls>
                      Your browser does not support the video tag.
                    </video>
                  }
                  </>
                }
                </div>
              )
            })
          }
          { admin &&
          <div className='blog-detail-body-add'>
            { formType ?
              <>
              { formType === 'title' &&
                <BlogTitleForm post={post} token={token} order={count + 1} slug={post.slug} category={post.category} setApiCall={setApiCall} formType={formType} setFormType={setFormType} />
              }
              { formType === 'paragraph' &&
                <BlogParagraphForm post={post} token={token} order={count + 1} slug={post.slug} category={post.category} setApiCall={setApiCall} formType={formType} setFormType={setFormType} />
              }
              { formType === 'snippet' &&
                <BlogSnippetForm post={post} token={token} order={count + 1} slug={post.slug} category={post.category} setApiCall={setApiCall} formType={formType} setFormType={setFormType} />
              }
              { formType === 'image' &&
                <BlogImageForm post={post} token={token} order={count + 1} slug={post.slug} category={post.category} setApiCall={setApiCall} formType={formType} setFormType={setFormType} />
              }
              { formType === 'video' &&
                <BlogVideoForm post={post} token={token} order={count + 1} slug={post.slug} category={post.category} setApiCall={setApiCall} formType={formType} setFormType={setFormType} />
              }
              </>
              :
              <>
              { addTypes ?
                <>
                <button onClick={() => {
                  setFormType('title');
                  setAddTypes(false);
              }}>Title</button>
                <button onClick={() => {
                  setFormType('paragraph')
                  setAddTypes(false);
                }}>Text</button>
                <button onClick={() => {
                  setFormType('snippet')
                  setAddTypes(false);
                }}>Code</button>
                <button onClick={() => {
                  setFormType('image')
                  setAddTypes(false);
                }}>Image</button>
                <button onClick={() => {
                  setFormType('video')
                  setAddTypes(false);
                }}>Video</button>
                </>
                :
                <button onClick={() => setAddTypes(true)}>Add</button>
              }
            </>
            }
          </div>
          }
        </div>
        :
        <></>
      }
    </div>
  )
}

export default BlogDetail;