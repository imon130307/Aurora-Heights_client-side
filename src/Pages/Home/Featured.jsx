import featuredImg from '../../assets/featuredImg/2.jpg';
import './Featured.css';


const Featured = () => {
    return (
        <div className="featured-item bg-fixed  text-white my-10">
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-30 pb-20 pt-12 px-36">
                <div>
                    <img className='w-[400px]' src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <h2>Jan 17, 2025</h2>
                    <p className="uppercase text-yellow-500">Hearty Comfort: Beef Stew</p>
                    <p>Rich, slow-cooked beef stew with tender vegetables in a flavorful broth, perfect for a cozy meal.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;