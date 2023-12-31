export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "valueKorean",
      title: "Value Korean",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
