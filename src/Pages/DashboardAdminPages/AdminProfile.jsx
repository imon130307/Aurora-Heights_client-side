import useAddedMeals from "../../Hooks/useAddedMeals";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";


const AdminProfile = () => {
    const {user}=useAuth()
    const [role]=useRole()
    const [addedMeals]=useAddedMeals()
    console.log(addedMeals)


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-[400px] h-[400px]">
                    <img
                    src={user?.photoURL}
                    className="w-full h-full rounded-lg shadow-2xl bg-center bg-cover object-cover" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                    <div className="flex gap-4 mt-4">
                        <div className="badge badge-primary">{role}</div>
                    </div>
                    <div className="mt-4">
                        <div className="badge badge-primary badge-outline">{user?.email}</div>
                    </div>
                    <div>
                        <button className="">
                        <span className="font-bold">Your added meals : </span>
                        <div className="badge badge-secondary ml-3">+{addedMeals.length}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;