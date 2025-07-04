import CallToAction from "~/components/Post/CallToAction";

const Project = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Project</h1>
      <p className="text-lg text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, JavaScript.
      </p>
      <CallToAction />
    </div>
  );
};
export default Project;
