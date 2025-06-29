import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "~/store/slice/postSlice";
import { Button } from "flowbite-react";
import CallToAction from "~/components/Post/CallToAction";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postSlug } = useParams();
  const { post } = useSelector((state) => state.post);
  const selectedPost = post?.data?.posts[0];
  console.log("🚀 ~ PostPage ~ selectedPost:", selectedPost);

  useEffect(() => {
    dispatch(getPosts({ slug: postSlug }));
  }, [dispatch, postSlug]);

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
    </div>
  );
};
export default PostPage;
