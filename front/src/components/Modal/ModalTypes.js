import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  modalContentAtom,
  displayModalAtom,
  postsAtom,
  categoryAtom,
  tokenAtom
} from "../../store";
import { AddPost, EditPost } from '../PostActions/PostActions';
import { deletePost } from '../../api-calls';

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