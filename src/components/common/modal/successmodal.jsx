import React from "react";

const SuccessModal = (props) => {
    const size = !props.size ? "modal-sm" : props.size;
    const title = !props.title ? "" : props.title;
    const message = !props.message ? "" : props.message;
    const action = !props.action ? "" : props.action;

    return (
        <div
            className="modal modal-blur fade"
            id={`${typeof props.id !== "undefined" ? props.id : "modal-success"}`}

            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
        >
            <div className={`modal-dialog ${size} modal-dialog-centered`} role="document">
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                    <div className={`modal-status bg-success`} />
                    <div className="modal-body text-center py-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon mb-2 text-green icon-lg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx={12} cy={12} r={9} />
                            <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <h3>{title}</h3>
                        <div className="text-muted">
                            {message}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="row">
                                <div className="col">
                                    <a href="#" className="btn w-100" data-bs-dismiss="modal">
                                        {
                                            !props.action ? "Close" : "Cancel" 
                                        }
                                    </a>
                                </div>
                                {
                                    props.action &&
                                    <div className="col">
                                        <button className={`btn btn-success w-100`}
                                            data-bs-dismiss="modal" onClick={action} >
                                            Proceed
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default SuccessModal;