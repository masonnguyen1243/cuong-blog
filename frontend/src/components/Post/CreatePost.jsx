import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createPost } from "~/store/slice/postSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", imageFile);

    try {
      toast
        .promise(dispatch(createPost(formData)), {
          pending: "Loading...",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Create post successfully");
            setCategory("");
            setTitle("");
            setContent("");
            setImageFile(null);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select onChange={(e) => setCategory(e.target.value)}>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>ReactJS</option>
            <option value={"reactjs"}>NextJS</option>
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
        {!imageFile && <Alert color="failure">Please select a image</Alert>}
        {imageFile && (
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
          Publish
        </Button>
      </form>
    </div>
  );
};
export default CreatePost;
