import React from "react";


const CustomerOverview = (props) => {

    return (

        <div className="row col-md-12">
            <div className="col-md-4">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <span className="bg-green text-white avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                    78 Orders
                                </div>
                                <div className="text-muted">
                                    Total Account Balance
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <span className="bg-green text-white avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                    78 
                                </div>
                                <div className="text-muted">
                                    Total Loans
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <span className="bg-green text-white avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx={6} cy={19} r={2} /><circle cx={17} cy={19} r={2} /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                </span>
                            </div>
                            <div className="col">
                                <div className="font-weight-medium">
                                    78 Orders
                                </div>
                                <div className="text-muted">
                                    Total Loan Paybacks
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg">
                <h2 className="mb-3">To Do</h2>
                <div className="mb-4">
                    <div className="row row-cards">
                        <div className="col-12">
                            <div className="card card-sm">
                                <div className="card-body">
                                    <h3 className="card-title">Enable analytics tracking</h3>
                                    <div className="ratio ratio-16x9">
                                        <img src="./static/projects/dashboard-1.png" className="rounded object-cover" alt="Enable analytics tracking" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerOverview;