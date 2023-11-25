const GenericModal = ({ isOpen, onClose, size, children }) => {
  const getModalSizeClass = () => {
    switch (size) {
      case "small":
        return "modal-sm";
      case "large":
        return "modal-lg";
      default:
        return "";
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className={`modal ${getModalSizeClass()}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenericModal;
