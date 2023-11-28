export default {
  name: "imageGallery",
  type: "object",
  title: "Image Gallery",
  fields: [
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
          preview: {
            select: {
              imageUrl: "asset.url",
              title: "asset.originalFilename",
              alt: "alt",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare(selection) {
      const { images } = selection;
      return {
        title:
          images && images.length > 0
            ? `Image Gallery (${images.length} images)`
            : "No images",
      };
    },
  },
};
