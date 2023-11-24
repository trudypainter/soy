// Section Component
import BlockContent from "@sanity/block-content-to-react";

const serializers = {
  types: {
    block: (props) => {
      switch (props.node.style) {
        case "h2":
          return <h2>{props.children}</h2>;
        case "h3":
          return <h3>{props.children}</h3>;
        case "h4":
          return <h4>{props.children}</h4>;
        case "blockquote":
          return <blockquote>{props.children}</blockquote>;
        default:
          return <p>{props.children}</p>;
      }
    },
    image: (props) => <img src={props.node.asset.url} alt={props.node.alt} />,
  },
  marks: {
    link: ({ children, mark }) => <a href={mark.href}>{children}</a>,
  },
};

export default ({ client, post }) => {
  return (
    <section className="border-t-[0.5px] border-black bg-white" id={post.title}>
      <div
        className="w-full border-b-[0.5px] border-black 
        flex justify-between items-center sticky top-0 
       bg-white z-40 p-4 px-8 phone:top-14"
      >
        <div className="text-xl mr-4">{post.title}</div>
        <div className="flex flex-wrap justify-end">
          {post.categories.map((category, index) => (
            <div
              className="mr-2 text-xs h-fit border-[0.5px] border-black p-1 rounded-full px-2 
            whitespace-nowrap  overflow-hidden text-overflow-ellipsis"
              key={index}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto p-4 px-8">
        {" "}
        <BlockContent
          blocks={post.body}
          serializers={serializers}
          projectId={client.projectId}
          dataset={client.dataset}
        />
      </div>
    </section>
  );
};
