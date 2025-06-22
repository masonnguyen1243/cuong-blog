import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value={"uncategories"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>ReactJS</option>
            <option value={"reactjs"}>NextJS</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
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
        {/* <textarea
          rows={6}
          placeholder="Write something..."
          className="bg-white text-black p-2 outline-none rounded-xs"
        ></textarea> */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
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
