import useAuth from "../../Hooks/useAuth";
import useBadge from "../../Hooks/useBadge";
import useRole from "../../Hooks/useRole";


const MyProfile = () => {
    const {user}=useAuth()
    // console.log(user)
    const [role]=useRole()
    // console.log(role);
    const [badge]=useBadge()
    // console.log(badge)


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
                        <div className="badge badge-accent">{badge}<span className="ml-1"> badge holder</span></div>
                    </div>
                    <div className="mt-4">
                        <div className="badge badge-primary badge-outline">{user?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;