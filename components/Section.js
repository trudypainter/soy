// Section Component
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";

// Create a function to get the image URL
function urlFor(source) {
  const builder = imageUrlBuilder({
    projectId: "tqbcbz9e",
    dataset: "production",
  });
  return builder.image(source);
}

const components = {
  types: {
    image: ({ value }) => {
      return <img className="my-1 w-full" src={value.asset}></img>;
    },
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
    twoColumnLayout: ({ value }) => (
      <div className="flex phone:flex-col space-y-2 phone:space-y-2">
        <div className="w-full phone:w-full">
          <PortableText value={value.left} components={components} />
        </div>
        <div className="w-full phone:w-full">
          <PortableText value={value.right} components={components} />
        </div>
      </div>
    ),
    halfColumnText: ({ value }) => (
      <div className="flex justify-end">
        <div className="w-1/2 phone:w-full ">
          <PortableText value={value.text} components={components} />
        </div>
      </div>
    ),
    video: ({ value }) => (
      <video className="w-full" controls src={value.asset}></video>
    ),
    imageGallery: ({ value, client }) => (
      <div className="flex space-x-2 overflow-x-auto">
        {value.images.map((image, index) => {
          const imageUrl = urlFor(image.asset).url();
          return <img className="h-96 object-contain" src={imageUrl}></img>;
        })}
      </div>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel} className="underline">
          {children}
        </a>
      );
    },
  },

  block: ({ children, style }) => {
    switch (style) {
      case "h2":
        return <h2 className="text-2xl my-4">{children}</h2>;
      case "h3":
        return <h3 className="text-xl my-4">{children}</h3>;
      case "h4":
        return <h4 className="text-lg my-4">{children}</h4>;
      case "blockquote":
        return <blockquote className="my-4">{children}</blockquote>;
      default:
        return <p className="my-4">{children}</p>;
    }
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
       bg-white z-40 p-4 px-8 phone:px-4 phone:top-18"
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
