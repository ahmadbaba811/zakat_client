import React from "react";

const ErrorModal = (props) => {

    return (
        <div
            className="modal modal-blur fade"
            id={"network-modal"}
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
        >
            <div className={`modal-dialog modal-sm modal-dialog-centered`} role="document">
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                    <div className={`modal-status bg-success`} />
                    <div className="modal-body text-center py-4">
                        <h3>"NETWORK ERROR"</h3>
                        <div className="text-muted">
                            Please check your connection
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="row">
                                <div className="col">
                                    <a href="#" className="btn w-100" data-bs-dismiss="modal">
                                        cancel
                                    </a>
                                </div>
                                <div className="col">
                                    <button className={`btn btn-success w-100`}
                                        data-bs-dismiss="modal" >
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default ErrorModal;