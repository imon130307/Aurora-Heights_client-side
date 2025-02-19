import AddMealForm from './../../Components/DashboardAdminComponents/AddMealForm';
import { Helmet } from 'react-helmet-async';
import useAuth from './../../Hooks/useAuth';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { imageUpload } from '../../Utils/Utility'




const AddMeal = () => {
        const [loading, setLoading] = useState(false)
        const navigate=useNavigate();
        const { user } = useAuth()
        const axiosSecure = useAxiosSecure()
        //! ---to show chosen image----
        const [uploadImage, setUploadImage] = useState({
        image: { name: 'Upload imoage' },
        })
        console.log(uploadImage)
        
        //====== handle form submit======
        const handleSubmit = async e => {
            e.preventDefault()
            setLoading(true)
            const form = e.target
            const title = form.name.value
            const category = form.category.value
            const image = form.image.files[0]
            const imageUrl = await imageUpload(image)
            const ingredients = form.ingredients.value
            const description = form.description.value
            const price = parseFloat(form.price.value)
            const rating = parseInt(form.quantity.value)
            const like=0
            const reviews_count=0
            const post_time=Date.now()
            // !=====seller or admin info======
            const seller_image=user?.photoURL
            const seller_email=user?.email

            // ===Create meal data object in db===
            const mealData = {
                title,
                category,
                image: imageUrl,
                ingredients,
                description,
                price,
                rating,
                like,
                reviews_count,
                post_time,
                seller_image,
                seller_email,
            }
            console.table(mealData)
        
            // !====save meal in db====
            try {
                //===== post req for a meal======
                await axiosSecure.post('/add-meal', mealData)
                form.reset();
                toast.success('Meal Added Successfully!')
                navigate('/')
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }


    return (
        <div>
            <Helmet>
                <title>Add meal | Dashboard</title>
            </Helmet>
            {/*===== Form ======*/}
            <AddMealForm
                handleSubmit={handleSubmit}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                loading={loading}
            ></AddMealForm>
        </div>
    );
};

export default AddMeal;