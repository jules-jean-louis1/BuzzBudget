import Login from "../form/login";


export default function ModalLogin({ onClose }) {
    return (
        <div className="modal_login ">
            <div className="modal-content">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">Bienvenue</h2>
                    <span className="close" onClick={onClose}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 pointer-events-none">
                            <path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fillRule="evenodd"></path>
                        </svg>
                    </span>
                </div>
            <Login />
            </div>
        </div>
    )
}