import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SubscriptionHistoryTable from "../../Components/Tables/SubscriptionHistoryTable";


const PaymentHistory = () => {
    const { user } = useAuth();
    console.log(user)
    const axiosSecure = useAxiosSecure();
    const { data: subscriptionsHistory = [] } = useQuery({
        queryKey: ['subscriptions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/subscriptions-history/${user?.email}`)
            return res?.data;
        }
    })
    console.log(subscriptionsHistory)

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Your payments</h2>
                <h2 className="text-3xl">Total payments: {subscriptionsHistory?.length}</h2>
            </div>
            {
                subscriptionsHistory?.length ?
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/*---- head ----*/}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>name</th>
                                    <th>subscriptionsFee</th>
                                    <th>transactionId</th>
                                    <th>date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subscriptionsHistory.map((subscriptionHistory,index) => 
                                        <SubscriptionHistoryTable
                                            key={index}
                                            subscriptionHistory={subscriptionHistory}
                                            index={index}
                                        ></SubscriptionHistoryTable>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </> 
                : 
                <>
                    <div className="grid justify-center items-center h-[300px]">
                        <h2 className="text-3xl font-bold text-green-200"> No complete payment yet</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default PaymentHistory;