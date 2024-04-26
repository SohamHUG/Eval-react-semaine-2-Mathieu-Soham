import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, selectCommentsByPostId } from "../../store/slice/commentSlice";
import { selectPost, updateCommentsLocally } from "../../store/slice/postSlice";
import { addComment } from "../../store/slice/commentSlice";

const PostDetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectPost(postId));
  const comments = useSelector(selectCommentsByPostId(postId));

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = (body) => {
    dispatch(updateCommentsLocally(postId, { id: Date.now(), body }));
    dispatch(addComment({ postId, body }));
    
  };
  // if (!post) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>Title : {post.title}</h2>
      <h3>Author : {post.author}</h3>
      <p>Content : {post.body}</p>
      <h4>Comments :</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        const body = e.target.comment.value;
        handleAddComment(body);
      }}>
        <input type="text" name="comment" />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default PostDetailPage;