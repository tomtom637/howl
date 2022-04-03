import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { modalContentAtom, displayModalAtom } from "../../store";

import ModalStyled from "./Modal-styles";

const Modal = ({ children }) => {
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);

  const handleKeydown = e => {
    if (e.key === 'Escape') {
      setDisplayModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [displayModal]);

  return (
    <ModalStyled>
      <div className="modal__dark-bg" onClick={() => setDisplayModal(false)} />
      <div className="modal__container">
        <button className="modal__close-btn" onClick={() => setDisplayModal(false)}>
          <span style={{ marginBottom: "-3px" }}>&#215;</span>
        </button>
        {children}
      </div>
    </ModalStyled>
  );
};

export default Modal;