import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_APP_SERVER_HOST_API + "products", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    findByCategory: async function (categoryId: string) {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + `collections/${categoryId}`)
    },
    findById: async (productId: string) => {
        return await axios.get(import.meta.env.VITE_APP_SERVER_HOST_API + `products/${productId}`)
    },
    findAll: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}/products?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    update: async function (productId: string, formData: FormData) {
        return await axios.patch(
            `${import.meta.env.VITE_APP_SERVER_HOST_API}/products/${productId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
    },
    search: async function (searchString: string) {
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_HOST_API}/search?search=${searchString}`)
    },
}