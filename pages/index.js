import React from 'react';
import axios from "axios";
import baseUrl from "../utils/baseUrl";

function Index({ user, userFollowStats }) {
  console.log({ user, userFollowStats });
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
