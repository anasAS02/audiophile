import './Dashboard.css';
import axios from "axios";
import { useEffect, useState } from "react"
import { ADD_USER, DELETE_USER, GET_ORDERS, GET_USERS } from "../../Apis";
import Cookies from "js-cookie";
import Table from 'react-bootstrap/Table';
import { useFormik } from 'formik';

export default function Dashboard(){
    const token = Cookies.get('token');
    const currentUser = Cookies.get('email');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState();
    const [totalAdmins, setTotalAdmins] = useState();
    const [orders, setOrders] = useState([]);

    const [usersMode, setUsersMode] = useState(true);
    const [ordersMode, setOrdersMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get(GET_USERS, config).then((data) => {setUsers(data.data.data.users);
        setTotalAdmins(data.data.data.totalAdmins);
        setTotalUsers(data.data.data.totalUsers);
        })
        axios.get(GET_ORDERS, config).then((data) => setOrders(data.data.data.orders))
    }, [users, orders])

    const handleUsersMode = () => {
        setUsersMode(true);
        setOrdersMode(false);
    }
    
    const handleOrdersMode = () => {
        setOrdersMode(true);
        setUsersMode(false);
    }

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          role: 'ADMIN',
        },
        onSubmit: async values => {
            try{
                setIsLoading(true);
                await axios.post(ADD_USER, values, config).then((data) => setUsers(data.data.data.users));
                setIsLoading(false);
                setSuccess('User has been created.');
                setTimeout(() => {
                    setSuccess(null)
                }, 3000)
                setError(null)
                formik.resetForm();
            }catch(err){
                setError(err.response.data.message)
                setIsLoading(false)
            }
        },
      });

      const handleDeleteUser = async (id, email) => {
          try{
                setIsLoading(true);
                await axios.post(DELETE_USER, {id}, config).then((data) => setUsers(data.data.data.users))
                setIsLoading(false);
            if(email === currentUser){
                handleLogout();
            }
        }catch(err){
            console.log(err)
        }
      }

      const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('email')
        Cookies.remove('role')
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalAmount');
        window.location.pathname = '/';
      }

      const totalProfit = orders.reduce((acc, order) => {
        acc += order.totalAmount;
        return acc;
      }, 0);
    return(
        <div className='dashboard'>
        {isLoading ?
        <div className='loading'>
            <div className="spinner"></div>
        </div>
        :
        <></>}
            <div className='control'>
                <button className={usersMode ? 'active' : ''} onClick={handleUsersMode}>users</button>
                <button className={ordersMode ? 'active' : ''} onClick={handleOrdersMode}>orders</button>
            </div>
            { usersMode &&
                <div className='users'>
                    <div className='data'>
                        <div className='total'>
                            <h2>Total Users: </h2>
                            <h2>{totalUsers || 0}</h2>
                        </div>
                        <div className='total'>
                            <h2>Total admins: </h2>
                            <h2>{totalAdmins || 0}</h2>
                        </div>
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, i) => (
                                <tr key={user._id}>
                                <td>{++i}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                <button className='del-user' onClick={() => handleDeleteUser(user._id, user.email)}>Delete</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='add-user'>
                        <h4>Create user</h4>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <select name="role" id='role' onChange={formik.handleChange}value={formik.values.role}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                            {
                                error && <p className='err'>{error}</p>
                            }
                            {
                                success && <p className='success-msg'>{success}</p>
                            }
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            }
            { ordersMode &&
                <div className='orders'>
                    <div className='data'>
                        <div className='total'>
                            <h2>Total Orders: </h2>
                            <h2>{orders.length}</h2>
                        </div>
                        <div className='total'>
                            <h2>Total profit: </h2>
                            <h2>{totalProfit}$</h2>
                        </div>
                    </div>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Items</th>
                            <th>Date</th>
                            <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={order._id}>
                                <td>{++i}</td>
                                <td>{order.email}</td>
                                <td>{order.items.map((item, i) => <p key={i}>{item.title} <span style={{color: 'yellow'}}>x{item.quantity}</span></p>)}</td>
                                <td>{order.createdAt.split('T')[0]}</td>
                                <td>{order.totalAmount}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}