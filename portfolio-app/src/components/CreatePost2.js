import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function CreatePost2(props) {
  console.log("This is props: " + JSON.stringify(props));
  console.log(
    "This is our new cookies in create post: " + props.cookies.auth_token
  );
  const [postObject, setPostObject] = useState({
    title: "",
    description: "",
    content: "",
  });

  function submitForm() {
    const posting = {
      title: postObject.title,
      description: postObject.description,
      content: postObject.content,
    };
    const config = {
      headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
    };
    console.log(
      "This is authorization before passing in: " + config.headers.Authorization
    );
    axios
      .post("http://localhost:5016/posts/create-post", posting, config)
      .then((res) => console.log(res.data));
    setPostObject({ title: "", description: "", content: "" });
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={postObject.title}
        onChange={(event) =>
          setPostObject({ ...postObject, title: event.target.value })
        }
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={postObject.description}
        onChange={(event) =>
          setPostObject({ ...postObject, description: event.target.value })
        }
      />
      <br />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        id="content"
        value={postObject.content}
        onChange={(event) =>
          setPostObject({ ...postObject, content: event.target.value })
        }
      />
      <br />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default CreatePost2;
