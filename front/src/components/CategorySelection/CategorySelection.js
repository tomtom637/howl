import { useEffect, useRef, useState } from "react";
import { atom, useAtom } from 'jotai';
import { tokenAtom, categoryAtom, busyAtom } from "../../store";
import { getAllCategories } from "../../api-calls";
import CategorySelectionStyled from "./CategorySelection-styles";

const CategorySelection = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [toggleShowCategories, setToggleShowCategories] = useState(false);
  const [busy, setBusy] = useAtom(busyAtom);

  const handleCategoryClick = (e, index) => {
    const newCategories = [...categories];
    newCategories.find(category => category.active).active = false;
    newCategories[index].active = true;
    setCategories(newCategories);
    setToggleShowCategories(false);
  };

  // if categories atom is empty, we fetch the categories list
  useEffect(() => {
    if (typeof categories !== undefined && categories.length === 0) {
      getAllCategories(setCategories, token);
    }
  }, []);

  // we add to the atom, properties we need in each category:
  // active, fetchOffset and morePostsToFetch
  useEffect(() => {
    if (
      typeof categories !== 'undefined'
      && categories.length > 0
      && !categories[0].hasOwnProperty('fetchOffset')
    ) {
      const categoriesWithProperties = categories.map((category, i) => {
        return {
          ...category,
          active: i === 0 ? true : false,
          fetchOffset: 0,
          morePostsToFetch: true
        };
      });
      setCategories(categoriesWithProperties);
      setBusy(false);
    }
  }, [categories]);

  return (
    <CategorySelectionStyled className="categories__wrapper">
      {!busy && (
        <>
          <button
            tabIndex={1}
            className={`categories__button`}
            type="button"
            onClick={() => setToggleShowCategories(!toggleShowCategories)}
          >
            {categories.find(category => category.active).name}
          </button>
          {toggleShowCategories && (
            <div className="categories__container">
              {categories.map((category, i) => (
                <div
                  key={category.id}
                  className="category__container"
                  onClick={e => handleCategoryClick(e, i)}
                >
                  {category.picture && (
                    <img
                      className="category__picture"
                      src={category.picture}
                      alt={category.name}
                    />
                  )}
                  <h3 tabIndex={1} className="category__name">{category.name}</h3>
                  <p className="category__description">{category.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </CategorySelectionStyled>
  );
};

export default CategorySelection;