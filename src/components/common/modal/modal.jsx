import React from "react";

const Modal = (props) => {
    const size = !props.size ? "modal-lg" : props.size;
    const title = !props.title ? "" : props.title;
    const id = !props.id ? "modal-large" : props.id;

    return (
        <div
            className="modal modal-blur fade"
            id={id}
            tabIndex={-1}
            style={{ display: "none" }}
            aria-modal="true"
            role="dialog"
        >
            <div className={`modal-dialog ${size} modal-dialog-centered`} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default Modal;

