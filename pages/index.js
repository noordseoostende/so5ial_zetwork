import React from 'react';
import axios from "axios";
import baseUrl from "../utils/baseUrl";

function Index({posts}) {
  return (
    <div>
      {posts && 
        posts.length > 0 && 
        posts.map(post => <h1 key={post._id}>{post.title}</h1>)}
    </div>
  );
}

Index.getInitialProps = async ctx => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

    const {name } =ctx.query;
    console.log(name);

    return { posts: res.data };


  
};

export default Index;
