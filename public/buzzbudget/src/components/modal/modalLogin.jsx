import Login from "../form/login";


export default function ModalLogin({ onClose }) {
    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <Login />
          </div>
        </div>
    )
}