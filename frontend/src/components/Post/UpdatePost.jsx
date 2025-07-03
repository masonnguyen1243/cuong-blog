import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "~/store/slice/postSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { postId } = useParams();
  const { post } = useSelector((state) => state.post);
  //   console.log("🚀 ~ UpdatePost ~ post:", post);
  //   console.log(postId);

  useEffect(() => {
    dispatch(getPosts({ postId }));
  }, [dispatch, postId]);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (post?.data?.posts[0]) {
      setTitle(post?.data?.posts[0]?.title);
      setCategory(post?.data?.posts[0]?.category);
      setContent(post?.data?.posts[0]?.content);
      setImageFile(post?.data?.posts[0]?.image);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", imageFile);

    try {
      toast
        .promise(dispatch(updatePost(postId, formData)), {
          pending: "Loading...",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Updated post successfully");
            navigate("");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>ReactJS</option>
            <option value={"nextjs"}>NextJS</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <Button
            type="button"
            size="sm"
            className={
              "bg-gradient-to-r from-purple-400 to-blue-400 cursor-pointer"
            }
          >
            Upload image
          </Button>
        </div>
        {!post?.data?.posts[0]?.image && (
          <Alert color="failure">Please select a image</Alert>
        )}
        {post?.data?.posts[0]?.image && (
          <img
            src={imageFile}
            alt="upload"
            className="w-full object-cover h-72"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={content}
          onChange={setContent}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-400 cursor-pointer"
        >
          Update
        </Button>
      </form>
    </div>
  );
};
export default UpdatePost;
