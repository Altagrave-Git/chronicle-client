import './blogdetail.scss';
import { BlogAPI } from "../../api/api";
import { useState, useEffect } from "react";
import BlogTitleForm from '../../forms/blogforms/titleform';
import BlogParagraphForm from '../../forms/blogforms/paragraphform';
import BlogSnippetForm from '../../forms/blogforms/snippetform';
import BlogImageForm from '../../forms/blogforms/imageform';
import BlogVideoForm from '../../forms/blogforms/videoform';
import PostForm from '../../forms/blogforms/postform';
import { Link } from 'react-router-dom';

const BlogDetail = ({ slug, category, categories, admin, token, post, setPost, apiCall, setApiCall, position, setRetrieveCategories }) => {
  const [content, setContent] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [count, setCount] = useState(0);
  const [addTypes, setAddTypes] = useState(false);
  const [formType, setFormType] = useState('');
  const [editMain, setEditMain] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedDrafts, setRelatedDrafts] = useState([]);

  const serverUrl = import.meta.env.VITE_CHRONICLE_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    setApiCall(true);
  }, [slug])

  useEffect(() => {
    if (apiCall) {
      setPost({});
      setContent([]);
      setEdit(-1);
      setFormType('');
      setCount(0);
      BlogAPI.getContent(category, slug)
        .then((data) => {
          const { titles, paragraphs, snippets, images, videos, related, ...postData } = data;
          const contentData = [...titles, ...paragraphs, ...snippets, ...images, ...videos];
          contentData.sort((a, b) => a.order - b.order);
          setContent(contentData);
          const relatedPostsData = [];
          const relatedDraftsData = [];
          related.forEach(obj => {
            if (obj.published) {
              relatedPostsData.push(obj);
            } else {
              relatedDraftsData.push(obj);
            }
          })
          setRelatedPosts(relatedPostsData);
          setRelatedDrafts(relatedDraftsData);
          setPost(postData);
          setCount(contentData.length);
        })
        .catch(error => console.log(error));
      setApiCall(false);
    }
  }, [apiCall])

  useEffect(() => {
    if (formType.length > 0) {
      const addContainer = document.querySelector(".blog-detail-body-add");
      window.scrollTo(0, addContainer.offsetTop);
    }
  }, [formType])

  const addContentUp = () => {
    if (count > 0) {
      setCount(count - 1);
      const editor = document.querySelector(".blog-detail-body-add");
      const previousItem = editor.previousElementSibling;
      previousItem.before(editor);
    }
  }

  const addContentDown = () => {
    if (count < document.querySelectorAll(".blog-detail-body-item").length) {
      setCount(count + 1);
      const editor = document.querySelector(".blog-detail-body-add");
      const nextItem = editor.nextElementSibling;
      nextItem.after(editor);
    }
  }

  console.log(post);
  console.log(content);
  console.log(relatedPosts);
  console.log(relatedDrafts);

  return (
    <div className="blog-detail">
      { Object.keys(post).length > 0 ?
        <>
          { editMain ?
            <PostForm token={token} categories={categories} setEditMain={setEditMain} titleData={post.title} categoryData={categories.find(obj => obj.id === post.category)} descriptionData={post.description != null ? post.description : ''} slug={slug} setApiCall={setApiCall} setRetrieveCategories={setRetrieveCategories} />
            :
            <div className="blog-detail-head" onClick={() => setEditMain(true)}>
              <h2 className='blog-detail-head-category'>[ {post.category_name[0].toLowerCase() + post.category_name.slice(1)} ]</h2>
              <h1 className='blog-detail-head-title'>{post.title}</h1>
              <p>Published on {post.pub_date}</p>
              <img src={serverUrl + post.image} alt="blog display image" />
            </div>
          }
        </>
        :
        <h1>Loading...</h1>
      }
      { content && content.length > 0 ?
        <div className='blog-detail-body'>
          {
            content.map((item, index) => {
              return (
                <div className="blog-detail-body-item" key={index} onClick={ admin && !post.published && edit != item.order ? () => {
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
                    <BlogImageForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} aspect={item.aspect} wMax={item.max_width} currentImage={serverUrl + item.image} />
                    :
                    <img src={serverUrl + item.image} alt="blog image item" />
                  }
                  </>
                }
                { item.type == 'video' &&
                  <>
                  { item.order === edit ?
                    <BlogVideoForm post={post} token={token} order={item.order} category={post.category} slug={post.slug} setApiCall={setApiCall} edit={edit} setEdit={setEdit} id={item.id} currentVideo={item.video} />
                    :
                    <video src={serverUrl + item.video} type="video/mp4" controls>
                      Your browser does not support the video tag.
                    </video>
                  }
                  </>
                }
                </div>
              )
            })
          }
          { admin && !post.published &&
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
                <button onClick={() => {
                  setFormType('title');
                  setEdit(-1);
                }}>Title</button>
                <button onClick={() => {
                  setFormType('paragraph');
                  setEdit(-1);
                }}>Text</button>
                <button onClick={() => {
                  setFormType('snippet');
                  setEdit(-1);
                }}>Code</button>
                <button onClick={() => {
                  setFormType('image');
                  setEdit(-1);
                }}>Image</button>
                <button onClick={() => {
                  setFormType('video');
                  setEdit(-1);
                }}>Video</button>
              </>
            }
          </div>
          }
        </div>
        :
        <>
          { admin && !post.published &&
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
                <button onClick={() => {
                  setFormType('title');
                  setEdit(-1);
                }}>Title</button>
                <button onClick={() => {
                  setFormType('paragraph');
                  setEdit(-1);
                }}>Text</button>
                <button onClick={() => {
                  setFormType('snippet');
                  setEdit(-1);
                }}>Code</button>
                <button onClick={() => {
                  setFormType('image');
                  setEdit(-1);
                }}>Image</button>
                <button onClick={() => {
                  setFormType('video');
                  setEdit(-1);
                }}>Video</button>
              </>
            }
          </div>
          }
        </>
      }
      <div className='blog-detail-footer'>
        { relatedPosts && relatedPosts.length > 0 ?
          <div className='blog-detail-related'>
            <>
              <h3 className="blog-detail-related-title">Related Posts</h3>
              { relatedPosts.map((item, index) => { return (
                <Link className='blog-detail-related-card' key={index} to={`${baseUrl}/blog/${item.category_slug}/${item.slug}`}>
                  <div className='blog-detail-related-card-image'>
                    <img src={serverUrl + item.image} alt={`related post ${index}`} />
                  </div>

                  <div className='blog-detail-related-card-info'>
                    <p className='blog-detail-related-card-meta'>{item.category_name} | {item.pub_date}</p>
                    <div className='blog-detail-related-card-text'>
                      <h5 className='blog-detail-related-card-title'>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Link>
              )})}
            </>
          </div>
        :
          <></>
        }
      </div>


      { admin && !post.published && content.length > 0 &&
        <div className='add-content-directions-container'>
          <div className='add-content-directions'>
            <button className='add-content-up' type='button' onClick={addContentUp}></button>
            <button className='add-content-down' type='button' onClick={addContentDown}></button>
          </div>
        </div>
      }
    </div>
  )
}

export default BlogDetail;