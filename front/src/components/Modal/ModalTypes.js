import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import {
  modalContentAtom,
  displayModalAtom,
  postsAtom,
  categoryAtom,
  tokenAtom
} from "../../store";
import { AddPost, EditPost } from '../PostActions/PostActions';
import { deletePost, updateCategoryName, updateCategoryDescription, updateCategoryPicture } from '../../api-calls';
import categoryDefaultPicture from '../../images/category_default.jpeg';

export const DeleteModal = ({ postType, postId }) => {
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const actionRef = useRef(null);

  useEffect(() => {
    actionRef.current.focus();
  });

  return (
    <>
      <div className="modal__header">
        <h5 className="modal__heading">CONFIRMATION</h5>
      </div>
      <div className="modal__content">
        {postType === 'post'
          ? 'This message is about be be deleted. This will also delete any reply it may have.'
          : 'This message is about be be deleted.'}
      </div>
      <div className="modal__actions">
        <div className="modal__actions-container">
          <button
            ref={actionRef}
            tabIndex={0}
            className="modal__btn modal__action-btn"
            onClick={() => {
              setDisplayModal(false);
              deletePost(posts, setPosts, categories, setCategories, postId, token);
            }}
          >
            DELETE
          </button>
          <button
            tabIndex={0}
            className="modal__btn modal__cancel-btn"
            onClick={() => setDisplayModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </>
  );
};

export const AddPostModal = ({ setToggleNewPost, categoryId, parentId, repliesRef, addPostRef, index }) => {
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  return (
    <div className="post-actions__container">
      <h3 className="post-actions__title">{!parentId ? 'ADD A NEW POST' : 'ADD A REPLY'}</h3>
      <AddPost
        setToggleNewPost={setToggleNewPost}
        categoryId={categoryId}
        parentId={parentId}
        index={index}
        repliesRef={repliesRef}
        addPostRef={addPostRef}
      />
    </div>
  );
};

export const EditPostModal = (post, setToggleNewPost, categoryId, parentId, repliesRef, addPostRef, index) => {
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  return (
    <div className="post-actions__container">
      <h3 className="post-actions__title">EDIT YOUR POST</h3>
      <EditPost
        post={post}
        setToggleNewPost={setToggleNewPost}
        categoryId={categoryId}
        parentId={parentId}
        index={index}
        repliesRef={repliesRef}
        addPostRef={addPostRef}
      />
    </div>
  );
};

export const CategoryModal = ({ categoryIndex }) => {
  // /*DEBUG*/ return <p style={{color:'black'}}>boubou</p>
  const [token, setToken] = useAtom(tokenAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [pictureChanged, setPictureChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [currentName, setCurrentName] = useState(categories[categoryIndex].name);
  const [currentDescription, setCurrentDescription] = useState(categories[categoryIndex].description);
  const preview = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const inputFile = useRef(null);

  const handleTextAreaSize = element => {
    element.style.height = 'inherit';
    const computed = window.getComputedStyle(element);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + element.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    element.style.height = `${height}px`;
  };

  const handleNameSubmit = e => {
    e.preventDefault();
    setNameChanged(false);
    updateCategoryName(categories, setCategories, currentName, categoryIndex, token);
  };

  const handleDescriptionSubmit = e => {
    e.preventDefault();
    setDescriptionChanged(false);
    updateCategoryDescription(categories, setCategories, currentDescription, categoryIndex, token);
  };

  const handlePictureSubmit = e => {
    e.preventDefault();
    const file = inputFile.current.files[0];
    let formData = new FormData();
    formData.append('image', file, file.name);
    updateCategoryPicture(categories, setCategories, categoryIndex, token, formData);
    setPictureChanged(false);
  };

  const handlePictureChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      preview.current.src = event.target.result;
    };
    reader.readAsDataURL(file);
    setPictureChanged(true);
  };

  // resize the textareas on load
  useEffect(() => {
    handleTextAreaSize(nameRef.current);
    handleTextAreaSize(descriptionRef.current);
  }, []);

  return (
    <>
      <ul className="category-modal__list">
        <li className="category-modal__item">
          <form onSubmit={e => handleNameSubmit(e)}>
            <textarea
              ref={nameRef}
              onFocus={() => handleTextAreaSize(nameRef.current)}
              onKeyDown={() => handleTextAreaSize(nameRef.current)}
              onBlur={() => handleTextAreaSize(nameRef.current)}
              onChange={e => {
                setNameChanged(true);
                setCurrentName(e.target.value);
              }}
              className="category-modal__name scroll"
              value={currentName || ''}
              placeholder="write the category name here"
            ></textarea>
            {nameChanged && <button type="submit" className="edit-button category-modal__edit">UPDATE</button>}
          </form>
        </li>
        <li className="category-modal__item">
          <form onSubmit={e => handleDescriptionSubmit(e)}>
            <textarea
              ref={descriptionRef}
              onFocus={() => handleTextAreaSize(descriptionRef.current)}
              onKeyDown={() => handleTextAreaSize(descriptionRef.current)}
              onBlur={() => handleTextAreaSize(descriptionRef.current)}
              onChange={e => {
                setDescriptionChanged(true);
                setCurrentDescription(e.target.value);
              }}
              className="category-modal__description scroll"
              value={currentDescription || ''}
              placeholder="write a category description here"
            ></textarea>
            {descriptionChanged && <button type="submit" className="edit-button category-modal__edit">UPDATE</button>}
          </form>
        </li>
        <li className="category-modal__picture category-modal__item">
          <form onSubmit={e => handlePictureSubmit(e)}>
            <label className="category-modal__picture-label" htmlFor="picture-input">
              {categories[categoryIndex].picture
                ? <img ref={preview} src={categories[categoryIndex].picture} alt={currentName}></img>
                : <img ref={preview} src={categoryDefaultPicture} alt={currentName}></img>
              }
            </label>
            <input
              ref={inputFile}
              id="picture-input"
              type="file"
              onChange={e => handlePictureChange(e)}
              className="category-modal__picture-input"
              accept="image/png, image/jpeg, image/jpg, image/gif"
            />
            {pictureChanged && <button type="submit" className="edit-button category-modal__edit">UPDATE</button>}
          </form>
        </li>
      </ul>
      <div className="category-modal__message">Click on what needs change</div>
    </>
  );
};