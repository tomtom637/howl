import ModalStyled from "./Modal-styles";

const Modal = ({ setIsOpen, content, actionType, action }) => {
  return (
    <ModalStyled>
      <div className="modal__dark-bg" onClick={() => setIsOpen(false)} />
      <div className="modal__container">
        <div className="modal__header">
          <h5 className="modal__heading">CONFIRMATION</h5>
        </div>
        <button className="modal__close-btn" onClick={() => setIsOpen(false)}>
          <span style={{ marginBottom: "-3px" }}>&#215;</span>
        </button>
        <div className="modal__content">
          {content}
        </div>
        <div className="modal__actions">
          <div className="modal__actions-container">
            <button
              className="modal__action-btn"
              onClick={() => {
                setIsOpen(false);
                action();
              }}
            >
              {actionType}
            </button>
            <button
              className="modal__cancel-btn"
              onClick={() => setIsOpen(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </ModalStyled>
  );
};

export default Modal;