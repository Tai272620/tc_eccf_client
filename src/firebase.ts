import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// thay config thành config của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBZIcAP40IjUlvsA3eWRTr5JkCZ5RInElo",
    authDomain: "md4-firebase.firebaseapp.com",
    projectId: "md4-firebase",
    storageBucket: "md4-firebase.appspot.com",
    messagingSenderId: "1050914673079",
    appId: "1:1050914673079:web:95bb196e2d115a87655832",
    measurementId: "G-RD8JQ9T0K2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) {

    if (!file) {
        return false
    }
    const fileRef = ref(storage, `${folderName}/` + file.name);

    let url = await uploadBytes(fileRef, file).then(async res => {
        return await getDownloadURL(res.ref)
            .then(url => url)
            .catch(er => false)
    })

    return url
}

/* Google Auth Import */

const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
    let auth = getAuth(app);
    return await signInWithPopup(auth, googleProvider)
}





