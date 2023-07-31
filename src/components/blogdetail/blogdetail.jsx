import './blogdetail.scss';
import { BlogAPI } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = ({ slug, category, categories, admin, token }) => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState([]);

  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    BlogAPI.getContent(category, slug)
      .then((data) => {
        const { titles, paragraphs, snippets, images, videos, ...postData } = data;
        const contentData = [...titles, ...paragraphs, ...snippets, ...images, ...videos];
        contentData.sort((a, b) => a.order - b.order);
        setContent(contentData);
        setPost(postData);
      })
      .catch(error => console.log(error));
  }, [])

  console.log(post);
  console.log(content);

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
                <div key={index}>
                { item.type == 'title' &&
                    <h3 className={`blog-detail-body-title ${item.size}`}>{item.text}</h3>
                }
                { item.type == 'paragraph' &&
                    item.text.split('\n').map((pg, index) => {
                      return <p key={index}>{pg}</p>
                    })
                }
                { item.type == 'snippet' &&
                    <div className='blog-detail-body-snippet' dangerouslySetInnerHTML={{__html: item.code}} />
                }
                { item.type == 'image' &&
                    <img src={baseUrl + item.image} alt="blog image item" />
                }
                { item.type == 'video' &&
                    <video src={baseUrl + item.video} type="video/mp4" controls>
                      Your browser does not support the video tag.
                    </video>
                }
                </div>
              )
            })
          }
        </div>
        :
        <></>
      }
    </div>
  )
}

export default BlogDetail;