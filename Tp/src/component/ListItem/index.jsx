// path: toolkit/src/component/ListItem/index.jsx
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <p>{post.body}</p>
    </div>
  );
};

export default PostItem;