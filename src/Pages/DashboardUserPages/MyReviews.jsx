

const MyReviews = () => {
    // const reviews=true;
    const reviews=[];
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Your Reviews</h2>
                <h2 className="text-3xl">Total Reviews: {reviews?.length}</h2>
            </div>
            {
                reviews?.length ?
                <>
                {/* TODO------rest proccess */}
                    <h2>You have reviews</h2>
                </> : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No add review yet</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default MyReviews;