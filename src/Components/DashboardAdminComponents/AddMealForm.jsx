import { TbFidgetSpinner } from 'react-icons/tb';



const AddMealForm = ({handleSubmit,setUploadImage,uploadImage,loading}) => {

    return (
            <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-4'>
                        {/*====== Name======== */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                            Title
                            </label>
                            <input
                            className='w-full px-4 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                            name='name'
                            id='name'
                            type='text'
                            placeholder='Plant Name'
                            required
                            />
                        </div>
                        {/* ========Category======= */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600 '>
                            Category
                            </label>
                            <select
                            required
                            className='w-full px-4 py-2 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                            name='category'
                            >
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Lunch'>Lunch</option>
                            <option value='Dinner'>Dinner</option>
                            </select>
                        </div>
                        {/* ========Ingredients======= */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='ingredients' className='block text-gray-600'>
                            Ingredients
                            </label>
                            <textarea
                            id='ingredients'
                            placeholder='Write ingredients here...'
                            className='block rounded-md focus:lime-300 w-full h-16 px-4 py-2 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                            name='ingredients'
                            ></textarea>
                        </div>
                        {/* ========Description======= */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                            Description
                            </label>
                            <textarea
                            id='description'
                            placeholder='Write meal description here...'
                            className='block rounded-md focus:lime-300 w-full h-20 px-4 py-2 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                            name='description'
                            ></textarea>
                        </div>
                    </div>

                    {/* =====Price & Quantity===== */}
                    <div className='space-y-4 flex flex-col'>
                        <div className='flex justify-between gap-2'>
                            {/*============= Price=============== */}
                            <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600 '>
                                Price
                            </label>
                            <input
                                className='w-full px-4 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Type your price'
                                required
                            />
                            </div>
                            {/* =====Rating==== */}
                            <div className='space-y-1 text-sm'>
                            <label htmlFor='quantity' className='block text-gray-600'>
                                Rating
                            </label>
                            <input
                                className='w-full px-4 py-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                                name='rating'
                                id='quantity'
                                type='number'
                                placeholder='Type your rating'
                                required
                            />
                            </div>
                        </div>
                        {/* ======Image=========== */}
                        <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
                            <div className='file_upload px-5 py-2 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                    <input
                                    onChange={e =>
                                        setUploadImage({
                                        image: e.target.files[0],
                                        url: URL.createObjectURL(e.target.files[0]),
                                        })
                                    }
                                        className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='image'
                                        id='image'
                                        accept='image/*'
                                        hidden
                                    />
                                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                                    {uploadImage?.image?.name}
                                    {/* {shortImageName(uploadImage?.image,5)} */}
                                    </div>
                                    </label>
                                </div>
                            </div>

                            {/* =========Image preview========= */}
                            {uploadImage && uploadImage?.image?.size && (
                                <div className='flex gap-5 mt-5 ml-5 items-center'>
                                <img className='w-20' src={uploadImage?.url} alt='' />
                                <p>Image Size: {uploadImage?.image?.size} Bytes</p>
                                </div>
                            )}

                        </div>
                        {/* =============Submit Button=========== */}
                        <button
                            type='submit'
                            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
                        >
                            {loading ? (
                            <TbFidgetSpinner className='animate-spin m-auto' />
                            ) : (
                            'Save & Continue'
                            )}
                        </button>
                </div>
            </div>
            </form>
            </div>
    );
};

export default AddMealForm;