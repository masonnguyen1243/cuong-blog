import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-tl-3xl rounded-br-3xl sm:flex-row p-3 border border-teal-500">
      <div className="flex-1">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-7">
          Checkout there resources with 100 JavaScript Projects
        </p>
        <Button className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-tl-xl rounded-bl-none">
          <a
            href="https://www.100jsprojects.com/projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
export default CallToAction;
