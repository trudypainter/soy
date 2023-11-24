export default {
  name: "menuType",
  title: "Menu Type",
  type: "document",
  fields: [
    {
      name: "value",
      title: "Type Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "valueKorean",
      title: "Type Value Korean",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
