import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "~/store/slice/postSlice";
import { Button } from "flowbite-react";
import CallToAction from "~/components/Post/CallToAction";
import CommentSection from "~/components/Comment/CommentSection";
import PostCard from "~/components/Post/PostCard";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postSlug } = useParams();
  const { post } = useSelector((state) => state.post);
  const selectedPost = post?.data?.posts[0];
  const [recentPosts, setRecentPosts] = useState(null);
  console.log("🚀 ~ PostPage ~ recentPosts:", recentPosts);

  useEffect(() => {
    dispatch(getPosts({ slug: postSlug }));
  }, [dispatch, postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await dispatch(getPosts({ limit: 3 })).unwrap();
        setRecentPosts(res.data);
      };

      fetchRecentPosts();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  return (
    <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {selectedPost && selectedPost.title}
      </h1>
      <Link
        to={`/search?category=${selectedPost && selectedPost.category}`}
        className="self-center mt-5"
      >
        <Button color={"gray"} pill size="xs" className="cursor-pointer">
          {selectedPost && selectedPost.category}
        </Button>
      </Link>

      <img
        src={selectedPost && selectedPost.image}
        alt={selectedPost && selectedPost.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>
          {selectedPost &&
            new Date(selectedPost.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {selectedPost && (selectedPost.content.length / 1000).toFixed(0)} mins
          read
        </span>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: selectedPost && selectedPost.content,
        }}
        className="p-3 max-w-2xl mx-auto w-full post-content"
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <CommentSection postId={selectedPost?._id} />

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
