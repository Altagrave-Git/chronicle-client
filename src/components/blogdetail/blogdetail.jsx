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
  const [formType, setFormType] = useState('');
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
        setEdit(-1);
        setFormType('');
        setApiCall(false);
    }
  }, [apiCall])

  useEffect(() => {
    if (formType.length > 0) {
      const addContainer = document.querySelector(".blog-detail-body-add");
      window.scrollTo(0, addContainer.offsetTop);
    }
  }, [formType])

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
                <div key={index} onClick={ admin && edit != item.order ? () => {
                  setFormType('');
                  setEdit(item.order);
                }:() => {return}}>
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
                    <BlogParagraphForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} text={item.text} />
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
                    <BlogSnippetForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} text={item.text} title={item.title} language={item.language} style={item.style} />
                    :
                    <div className='blog-detail-body-snippet' dangerouslySetInnerHTML={{__html: item.code}} />
                  }
                  </>
                }
                { item.type == 'image' &&
                  <>
                  { item.order === edit ?
                    <BlogImageForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} aspect={item.aspect} wMax={item.max_width} currentImage={baseUrl + item.image} />
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
                <button onClick={() => {setFormType('title')}}>Title</button>
                <button onClick={() => {setFormType('paragraph')}}>Text</button>
                <button onClick={() => {setFormType('snippet')}}>Code</button>
                <button onClick={() => {setFormType('image')}}>Image</button>
                <button onClick={() => {setFormType('video')}}>Video</button>
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