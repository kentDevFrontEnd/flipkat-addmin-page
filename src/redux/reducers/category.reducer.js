import { categoryConst } from "../const";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// FIXME
const buildCategories = (parentId, categories, category) => {
  // console.log(parentId, category);

  if (!parentId) return [...categories, category];

  let myCategories = [];

  for (let cate of categories) {
    if (cate._id === parentId) {
      console.log("get id here");
      myCategories.push({
        ...cate,
        children:
          cate.children && cate.children.length > 0
            ? buildCategories(parentId, [...cate.children, category], category)
            : [category],
      });
    } else {
      myCategories.push({
        ...cate,
        children:
          cate.children && cate.children.length > 0
            ? buildCategories(parentId, cate.children, category)
            : [],
      });
    }
  }
  // console.log("myCategories", myCategories);

  return myCategories;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConst.GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConst.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryConst.GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConst.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConst.ADD_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategories = buildCategories(
        category.parentId,
        state.categories,
        category
      );

      console.log(updateCategories);

      return {
        ...state,
        loading: false,
        categories: updateCategories,
      };
    case categoryConst.ADD_CATEGORY_FAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default categoryReducer;
