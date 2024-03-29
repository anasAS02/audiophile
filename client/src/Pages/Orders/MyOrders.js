import axios from "axios";
import { useEffect, useState } from "react"
import { MY_ORDERS } from "../../Apis";
import Cookies from "js-cookie";
import Table from "react-bootstrap/esm/Table";

export default function MyOrders(){
    const [myOrders, setMyOrders] = useState([]);
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const data = {
        email: email,
      };

    useEffect(() => {
        axios.post(MY_ORDERS, data, config).then((data) => setMyOrders(data.data.data.orders));
    }, [myOrders])

    return(
        <div className='my-orders' style={{padding: '25px'}}>
        {  myOrders.length > 0 ?
            <Table striped style={{marginTop: '40px', position: 'relative', borderRadius: '6px', width: '100%'}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Items</th>
                    <th>Date</th>
                    <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {myOrders.map((order, i) => (
                        <tr key={order._id}>
                        <td>{++i}</td>
                        <td>{order.items.map((item) => <p>{item.title} <span style={{color: 'yellow'}}>x{item.quantity}</span></p>)}</td>
                        <td>{order.createdAt.split('T')[0]}</td>
                        <td>{order.totalAmount}$</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    :
            <h2 style={{position: 'absolute', left: '50%', translate: '-50%' , color: 'red'}}>You do not have any order</h2>
        }
        </div>
    )
}