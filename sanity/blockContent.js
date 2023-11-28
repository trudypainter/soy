/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
import imageGallery from "./imageGallery";
import { FiVideo, FiImage, FiColumns } from "react-icons/fi";
import { MdPhotoLibrary } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        // {title: 'H1', value: 'h1'},
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      title: "Image (Full Width)",
      type: "image",
      options: { hotspot: true },
      icon: FiImage,
    },
    {
      title: "Video",
      name: "video",
      type: "file",
      options: {
        accept: "video/mp4, video/quicktime",
      },
      icon: FiVideo,
    },
    {
      title: " 1/4 text with 1/2 text",
      name: "twoColumnLayout",
      type: "object",
      fields: [
        {
          title: "Left Column",
          name: "left",
          type: "blockContent",
        },
        {
          title: "Right Column",
          name: "right",
          type: "blockContent",
        },
      ],
      preview: {
        select: {
          left: "left[0].children[0].text",
          right: "right[0].children[0].text",
        },
        prepare(selection) {
          const { left, right } = selection;
          return {
            title: `${left ? left.slice(0, 30) : ""} || ${
              right ? right.slice(0, 30) : ""
            }`,
          };
        },
      },
      icon: FiColumns,
    },
    {
      title: "1/2 Column Text",
      name: "halfColumnText",
      type: "object",
      fields: [
        {
          title: "Text",
          name: "text",
          type: "blockContent",
        },
      ],
      preview: {
        select: {
          text: "text[0].children[0].text",
        },
        prepare(selection) {
          const { text } = selection;
          return {
            title: `${text ? text.slice(0, 30) : ""}`,
          };
        },
      },
      icon: FaArrowRight,
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "imageGallery",
      icon: MdPhotoLibrary,
    },
  ],
};
