// Section Component
export default ({ project }) => {
  return (
    <section className="border-t-[0.5px] border-black bg-white" id={project.id}>
      <div
        className="w-full border-b-[0.5px] border-black 
        flex justify-between sticky top-0 
       bg-white z-40 p-4 phone:top-16"
      >
        <div className="text-2xl ">{project.title}</div>
        <div className="flex flex-wrap justify-end">
          {project.tags.map((tag, index) => (
            <div
              className="mr-2 text-xs h-fit border-[0.5px] border-black p-1 rounded-full px-2 
            whitespace-nowrap overflow-hidden text-overflow-ellipsis"
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto p-4 ">{project.content}</div>
    </section>
  );
};
