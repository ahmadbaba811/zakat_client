import React from "react";

export const PageHeader = (props) => {
    return (
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">{props.title[0]}</h2>
                        <span>
                            {props.title[1]}/ <a href="#" className="text-muted">
                                {props.title[2]}
                            </a></span>
                    </div>
                    {
                        props.btntext &&
                        <div className="col-12 col-md-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <a
                                    href="#"
                                    className="btn btn-primary d-none d-sm-inline-block"
                                    data-bs-toggle="modal" data-bs-target={`#${props.target}`} onClick={!props.Reset ? () => { } : props.Reset}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24"
                                        strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={5} y1={12} x2={19} y2={12} />
                                    </svg>
                                    {!props.btntext ? "New" : props.btntext}
                                </a>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}