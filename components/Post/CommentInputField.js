import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function CommentInputField({ postId, user, setComments }) {
  return (
    <Form
      reply>
        {/* <Form
      reply
      onSubmit={async e => {
        e.preventDefault();
        setLoading(true);
        await postComment(postId, user, text, setComments, setText);

        setLoading(false);
      }}> */}
      <Form.Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add Comment"
        action={{
          color: "blue",
          icon: "edit",
          loading: loading,
          disabled: text === "" || loading
        }}
      />
    </Form>
  );
}

export default CommentInputField;
