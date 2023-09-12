import axios from "axios";

export default {
    createGuestReceipt: async function (newGuestReceipt: any, guestReceiptDetailList: any) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "purchase", {
            newGuestReceipt,
            guestReceiptDetailList
        })
    },
    createUserReceipt: async function (newUserReceipt: any, userReceiptDetailList: any, userId: string) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "purchase/customer", {
            newUserReceipt,
            userReceiptDetailList,
            userId
        })
    },
    findGuestReceipt: async function (data: {
        email: string;
        otp?: string;
    }) {
        let body: any = {
            guestEmail: data.email
        }
        if (data.otp) {
            body.otp = data.otp
        }
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "purchase/order-history", body)
    },
    findUserReceipt: async function (userId: string) {
        return await axios.post(`${import.meta.env.VITE_APP_SERVER_HOST_API}purchase/customer-order`, userId);
    },
    findAll: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}purchase?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    findById: async function (orderId: string) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}purchase/${orderId}`);
    },
    update: async function (orderId: string, data: {
        state: string,
        type: boolean
    }) {
        return await axios.patch(`${import.meta.env.VITE_APP_SERVER_HOST_API}purchase/${orderId}`, data);
    },
}