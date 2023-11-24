// We import object and document schemas
import post from "./post";
import category from "./category";
import blockContent from "./blockContent";
import menuType from "./menuType";

export const schema = {
  types: [
    // The following are document types which will appear
    // in the studio.
    menuType,
    post,
    category,
    blockContent,
  ],
};
