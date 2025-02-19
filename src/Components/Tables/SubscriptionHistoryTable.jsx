

const SubscriptionHistoryTable = ({subscriptionHistory,index}) => {
    console.log(subscriptionHistory)
    const {name,subscriptionsFee,transactionId,date}=subscriptionHistory;
    return (
        <tr >
        <th>{index + 1}</th>
        <td className="">{name}</td>
        <td><span className="ml-3">{subscriptionsFee}</span></td>
        <td><span className="">{transactionId}</span></td>
        <td><span className="ml-3">{date}</span></td>
        {/* <td><span className="ml-3">{new Date(date)}</span></td> */}
        </tr>
    );
};

export default SubscriptionHistoryTable;