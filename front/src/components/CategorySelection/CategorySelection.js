import { useEffect, useState } from "react";
import { atom, useAtom } from 'jotai';
import { tokenAtom, categoryAtom, busyAtom, userInfosAtom, displayModalAtom, modalContentAtom } from "../../store";
import { getAllCategories } from "../../api-calls";
import CategorySelectionStyled from "./CategorySelection-styles";
import { CategoryModal } from '../Modal/ModalTypes';
import defaultCategoryPicture from '../../images/category_default.jpeg';

const CategorySelection = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [toggleShowCategories, setToggleShowCategories] = useState(false);
  const [busy, setBusy] = useAtom(busyAtom);
  const [userInfos, setUserInfos] = useAtom(userInfosAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [modalContent, setModalContent] = useAtom(modalContentAtom);

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
          <div className="categories-header">
            <img
              src={categories.find(category => category.active).picture || defaultCategoryPicture}
              alt={categories.find(category => category.active).name}
              className="categories-header__picture" 
            />
            <h2 className="categories-header__heading">
              {categories.find(category => category.active).name}
            </h2>
            <button
              tabIndex={2}
              className='categories-header__button'
              type="button"
              onClick={e => {
                setToggleShowCategories(!toggleShowCategories)
              }}
            >
              change category
            </button>
          </div>
          {toggleShowCategories && (
            <div className="categories__container">
              {categories.map((category, i) => (
                <div
                  key={category.id}
                  className="category__container"
                  onClick={e => {
                    if (e.target.id !== 'category-update') {
                      handleCategoryClick(e, i)
                    }
                  }}
                >
                  <img
                      className="category__picture"
                      src={category.picture || defaultCategoryPicture}
                      alt={category.name}
                    />
                  <h3 tabIndex={2} className="category__name">{category.name}</h3>
                  <p className="category__description">{category.description}</p>
                  {userInfos.role === 'admin' && (
                    <button
                      id="category-update"
                      type="button"
                      className="category__edit"
                      onClick={() => {
                        setModalContent(
                          <CategoryModal categoryIndex={i}/>
                        );
                        setDisplayModal(true);  
                      }}
                    >EDIT</button>
                  )}
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