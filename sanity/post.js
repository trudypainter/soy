import { HiOutlineDocumentAdd } from "react-icons/hi";

export default {
  name: "post",
  title: "Posts",
  icon: HiOutlineDocumentAdd,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "titleKorean",
      title: "Title Korean",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "menuTag",
      title: "Menu Tag",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "menuTagKorean",
      title: "Menu Tag Korean",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "menuType",
      title: "Menu Type",
      type: "reference",
      to: [{ type: "menuType" }],
      validation: (Rule) => Rule.required(),
    },

    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bodyKorean",
      title: "Body Korean",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
