import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getCurrentPost } from "~/store/slice/postSlice";
import { Button } from "flowbite-react";
import CallToAction from "~/components/Post/CallToAction";
import CommentSection from "~/components/Comment/CommentSection";
import PostCard from "~/components/Post/PostCard";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { selectedPost } = useSelector((state) => state.post);
  const selectedPostData = selectedPost?.data;
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    dispatch(getCurrentPost({ postId: postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await dispatch(getPosts({ limit: 3 })).unwrap();
        setRecentPosts(res.data.posts);
      };

      fetchRecentPosts();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  return (
    <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {selectedPostData && selectedPostData.title}
      </h1>
      <Link
        to={`/search?category=${selectedPostData && selectedPostData.category}`}
        className="self-center mt-5"
      >
        <Button color={"gray"} pill size="xs" className="cursor-pointer">
          {selectedPostData && selectedPostData.category}
        </Button>
      </Link>

      <img
        src={selectedPostData && selectedPostData.image}
        alt={selectedPostData && selectedPostData.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {selectedPostData &&
            new Date(selectedPostData.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {selectedPostData &&
            (selectedPostData.content.length / 1000).toFixed(0)}{" "}
          mins read
        </span>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: selectedPostData && selectedPostData.content,
        }}
        className="p-3 max-w-2xl mx-auto w-full post-content"
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <CommentSection postId={selectedPostData?._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articales</h1>
        <div className="flex gap-5 flex-col md:flex-row">
          {recentPosts &&
            recentPosts?.posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default PostPage;
