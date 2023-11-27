// Section Component
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";

const components = {
  types: {
    image: ({ value }) => {
      return <img className="my-1" src={value.asset}></img>;
    },
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default ({ client, post }) => {
  console.log(post.title, post.body);

  const sampleBlocks = [
    {
      style: "normal",
      _type: "block",
      children: [
        {
          _type: "span",
          marks: ["a-key", "emphasis"],
          text: "some text",
        },
      ],
      markDefs: [
        {
          _key: "a-key",
          _type: "markType",
          extraData: "some data",
        },
      ],
    },
  ];

  return (
    <section className="border-t-[0.5px] border-black bg-white" id={post.title}>
      <div
        className="w-full border-b-[0.5px] border-black 
        flex justify-between items-center sticky top-0 
       bg-white z-40 p-4 px-8 phone:px-4 phone:top-14"
      >
        <div className="text-xl mr-4">{post.title}</div>
        <div className="flex flex-wrap justify-end">
          {post.categories.map((category, index) => (
            <div
              className="ml-2 text-xs h-fit border-[0.5px] border-black p-1 rounded-full px-2 
            whitespace-nowrap  overflow-hidden text-overflow-ellipsis"
              key={index}
            >
              {category.value}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto p-4 px-8 phone:px-4">
        <PortableText
          value={post.body}
          components={components}
          client={client}
        />
      </div>
    </section>
  );
};
