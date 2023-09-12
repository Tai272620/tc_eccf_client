import axios from "axios";

export default {
    register: async (newUser: any) => {
        return await axios.post(
            import.meta.env.VITE_APP_SERVER_HOST_API + "users",
            newUser,
        )
            .then(res => res)
            .catch(err => err)
    },
    login: async (data: any) => {
        return await axios.post(
            import.meta.env.VITE_APP_SERVER_HOST_API + "users/login",
            data,
        )
    },
    authentication: async () => {
        return await axios.get(
            import.meta.env.VITE_APP_SERVER_HOST_API + "auth"
        )
    }
}