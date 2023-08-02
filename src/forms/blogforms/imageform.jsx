import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";

const BlogImageForm = ({ post, token, order, category, slug, setApiCall, item=null }) => {
  const [text, setText] = useState('');
  const [size, setSize] = useState('m');

  const handleSubmit = async () => {
    const form = {
      type: 'title',
      order: order,
      post: post.slug,
      text: text,
      size: size,
    };

    if (item != null) {
      form['id'] = item.id;
    }

    BlogAPI.postContent(token, form, category, slug)
      .then(data => {
        console.log(data);
        setApi
      })
      .catch(error => console.log(error));
      setApiCall(true);
  }

  return (
    <></>
  )
}

export default BlogImageForm;