import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

function Index({ user, userFollowStats }) {
  console.log({ user, userFollowStats });
  useEffect(() => {
    document.title = `Welcome, ${user.name.split(' ')[0]}`
  
  }, [])
  return (
    <div>
      Homepagina
    </div>
  );
}

// Index.getInitialProps = async ctx => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

//     const {name } =ctx.query;
//     console.log(name);

//     return { posts: res.data };


  
// };

export default Index;
