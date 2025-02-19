import axios from 'axios'

//! ====Upload image and return image url by help of imgbb====
export const imageUpload = async (imageData) => {
    const formData = new FormData()
    formData.append('image', imageData)
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
    )
    const image_url=data.data.display_url;
    return image_url;
}



//! -----It is used for Saving UserInfo in DB-------
export const saveUser=async(user)=>{
    const userInfo={
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
        role:"customer",
        badge:"Bronze",
        user_registration_date:Date.now(),
        }
    await axios.post(`${import.meta.env.VITE_API_URL}/user/${user?.email}`,userInfo)
}