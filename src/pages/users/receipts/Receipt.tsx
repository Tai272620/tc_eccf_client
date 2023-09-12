import { useEffect, useState } from 'react';
import './receipt.scss';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import OTPVerification from '../otpVerify/OtpVerify';
import { message } from 'antd';
import dateFormat from "dateformat";
import { StoreType } from '@/stores';
import { useSelector } from 'react-redux';

interface Receipt {
    id: string,
    state: string,
    total: number,
    createAt: Date,
    email: string
}

export default function Receipt() {
    const [isLogin, setIsLogin] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [receipts, setReceipts] = useState([]);
    const [isShowOTP, setIsShowOTP] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [isShowReceipts, setIsShowReceipts] = useState(false);
    const navigate = useNavigate();

    const userStore = useSelector((store: StoreType) => store.userStore);

    console.log("userStore", userStore)

    function handleGetOtp() {
        setLoading(true);
        api.purchaseApi.findGuestReceipt({ email: emailInput })
            .then(res => {
                setLoading(false);
                if (res.status == 200) {
                    console.log("res", res)
                    message.success(res.data.message)
                    setIsShowOTP(true);
                    setIsShow(false);
                }
                console.log("đã vào đây", res.data)
            })
            .catch(err => {
                setLoading(false);
                console.log("lỗi", err)
            })

    }
    function handleGetReceipt(otp: string) {
        api.purchaseApi.findGuestReceipt({ email: emailInput, otp: otp ?? "29121999" })
            .then(res => {
                if (res.status == 200) {
                    message.success("Get receipts successfully")
                    setLoadingVerify(false);
                    setIsShowOTP(false);
                    setIsShowReceipts(true);
                    console.log("res", res.data.data)
                    setReceipts(res.data.data)
                }
            })
            .catch(err => {
                message.error("modelErr");
                setLoadingVerify(false);
            })
    }
    return (
        <>{isLogin == null ? <>
            {isShow ? <div className='getOTP-container'>
                <h5>Enter your email to get OTP</h5>
                <input type="text" placeholder='Enter your email' value={emailInput} onChange={(e) => {
                    setEmailInput(e.target.value)
                }} /><br />
                <button onClick={() => {
                    handleGetOtp()
                }}>{loading ? <span className='loading-spinner'></span> : "Submit"}</button>
            </div> : <></>}
            {isShowOTP ? <OTPVerification handleGetReceipt={handleGetReceipt} loadingVerify={loadingVerify} /> : <></>}
            {isShowReceipts ? <div className="container mt-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10">
                        <div className="rounded">
                            <div className="table-responsive table-borderless">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Email</th>
                                            <th>status</th>
                                            <th>Total</th>
                                            <th>Created</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {receipts?.map((receipt, index) => (
                                            <tr className="cell-1">
                                                <td>{(receipt as Receipt).id}</td>
                                                <td>{(receipt as Receipt).email}</td>
                                                <td>
                                                    <span className="badge badge-success">{(receipt as Receipt).state}</span>
                                                </td>
                                                <td>${(receipt as Receipt).total}</td>
                                                <td>{dateFormat((receipt as Receipt).createAt.toLocaleString(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                                <td>
                                                    <span className="material-symbols-outlined" onClick={() => {
                                                        navigate(`${(receipt as Receipt).id}`)
                                                    }}>
                                                        more_horiz
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <></>}
        </> : <><div className="container mt-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    <div className="rounded">
                        <div className="table-responsive table-borderless">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Email</th>
                                        <th>status</th>
                                        <th>Total</th>
                                        <th>Created</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {userStore.data?.userReceipts.map((receipt: any, index: number) => (
                                        <tr className="cell-1" key={Math.random() * Date.now()}>
                                            <td>{(receipt as Receipt).id}</td>
                                            <td>{(receipt as Receipt).email}</td>
                                            <td>
                                                <span className="badge badge-success">{(receipt as Receipt).state}</span>
                                            </td>
                                            <td>${(receipt as Receipt).total}</td>
                                            <td>{dateFormat((receipt as Receipt).createAt.toLocaleString(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                            <td>
                                                <span className="material-symbols-outlined" onClick={() => {
                                                    navigate(`${(receipt as Receipt).id}`)
                                                }}>
                                                    more_horiz
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div></>}</>
    )
}
