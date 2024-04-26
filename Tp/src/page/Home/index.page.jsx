// path : toolkit/src/page/Home/index.page.jsx
import { useSelector } from "react-redux";
import { selectPosts, selectLoadingState } from "../../store/slice/postSlice.js";
import PostItem from "../../component/ListItem/index.jsx";

const HomePage = () => {
  const posts = useSelector(selectPosts);
  const loadingState = useSelector(selectLoadingState);
  
  return (
    <div className={'page'}>
      <h5>Welcome to the Post App</h5>
      {loadingState === "loading" ?
        <div>Loading...</div>
        : loadingState === 'error' ?
          <div>Error, please try again</div>
          : posts.length > 0 ?
            posts.map(post => <PostItem key={post.id} post={post} />)
            :
            <span>No posts to display.</span>
      }
    </div>
  );
};

export default HomePage;