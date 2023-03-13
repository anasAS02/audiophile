import "./checkout.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, CardContent, TextField } from "@material-ui/core";


export default function Checkout(){


    const cart = useSelector((state) => state.cart);

    const totalPrice = cart.reduce((acc, products) => {
        acc += products.price * products.quantity;
        return acc;
    }, 0)

    const shipping = 50;
    const vat = totalPrice / 100 * 10;
    const total = shipping + vat + totalPrice;

    const [done, setDone] = useState(false);
    
    return(
    <div className="checkout">
        <Link className="back" to="/cart">Go Back</Link>
        <div className="all">
            <div className="details">
                    <Card>
                        <CardContent>
                            <Formik 

                                initialValues={{name: '',
                                email: "",
                                phone: "",
                                address: "",
                                zipCode: "",
                                city: "",
                                country: "",
                                visa: "",
                                pin: "",
                                }}

                                validationSchema={Yup.object().shape({
                                    name: Yup.string().required("Required"),
                                    email: Yup.string().required("Required"),
                                    phone: Yup.number().required("Required"),
                                    address: Yup.string().required("Required"),
                                    zipCode: Yup.number().required("Required"),
                                    city: Yup.string().required("Required"),
                                    country: Yup.string().required("Required"),
                                    visa: Yup.number().required("Required"),
                                    pin: Yup.number().required("Required"),
                                })}
                                onSubmit={(values) =>{
                                    if(cart.length !== 0){
                                        setDone(true);
                                        setTimeout(() => {
                                            setDone(false);
                                            window.location.replace('/cart');
                                        }, 3000)
                                    }else{
                                        setDone(false);
                                    }
                                }}
                                >
                                    {({
                                        values,
                                        errors,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                placeholder="Your Name"
                                                component={TextField}
                                                error={errors.name ? true : false}
                                                helperText={errors.name && errors.name}
                                            />
                                            <Field
                                                type="text"
                                                name="email"
                                                id="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                placeholder="Your Email"
                                                component={TextField}
                                                error={errors.email ? true : false}
                                                helperText={errors.email && errors.email}
                                            />
                                            <Field
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phone}
                                                placeholder="phone"
                                                component={TextField}
                                                error={errors.phone ? true : false}
                                                helperText={errors.phone && errors.phone}
                                            />
                                            <Field
                                                type="text"
                                                name="address"
                                                id="address"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address}
                                                placeholder="address"
                                                component={TextField}
                                                error={errors.address ? true : false}
                                                helperText={errors.address && errors.address}
                                            />
                                            <Field
                                                type="text"
                                                name="zipCode"
                                                id="zipCode"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.zipCode}
                                                placeholder="zip code"
                                                component={TextField}
                                                error={errors.zipCode ? true : false}
                                                helperText={errors.zipCode && errors.zipCode}
                                            />
                                            <Field
                                                type="text"
                                                name="city"
                                                id="city"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                                placeholder="city"
                                                component={TextField}
                                                error={errors.city ? true : false}
                                                helperText={errors.city && errors.city}
                                            />
                                            <Field
                                                type="text"
                                                name="country"
                                                id="country"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.country}
                                                placeholder="country"
                                                component={TextField}
                                                error={errors.country ? true : false}
                                                helperText={errors.country && errors.country}
                                            />
                                            <Field
                                                type="text"
                                                name="visa"
                                                id="visa"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.visa}
                                                placeholder="visa"
                                                component={TextField}
                                                error={errors.visa ? true : false}
                                                helperText={errors.visa && errors.visa}
                                            />
                                            <Field
                                                type="text"
                                                name="pin"
                                                id="pin"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.pin}
                                                placeholder="pin"
                                                component={TextField}
                                                error={errors.pin ? true : false}
                                                helperText={errors.pin && errors.pin}
                                            />

                                            <Button className="pay-btn" type="submit" disabled={isSubmitting}>Continue & Pay</Button>
                                        </Form>
                                    )}
                                </Formik>
                        </CardContent>
                    </Card>
                </div>

            <div className="payment">
                <p className="head">Summary</p>
                {cart.map((product) => (
                    <>
                    <div className="products">
                        <img src={product.mainImg}></img>
                        <div className="text">
                            <p>
                                {product.title}
                                <span>{totalPrice} $</span>
                            </p>
                        </div>
                    </div>
                    </>
                ))}
                    <div className="info">
                        <span>
                        Shipping
                            <p id="shippingPrice">{shipping} $</p>
                        </span>
                        <span>
                        Vat (Included)
                            <p>{vat.toFixed(2)} $</p>
                        </span>
                        <span>
                        Grand Total
                            <p>{total.toFixed(2)} $</p>
                        </span>
                    </div>
            </div>
        </div>
        <div className={`done${done == true ? " active" : ""}`}>
                            <div className="head">
                            <i className="fa-solid fa-circle-check"></i>
                                <p>Thank You <br/>
                                    For Your Order
                                </p>
                            </div>
                        <div className="body">
                                <p className="p-body">You will receive an email confirmation shortly.</p>
                                <div className="order">
                {
                    cart.map((product) => (
                        <>
                                <div className="info">
                                    <img src={product.mainImg}></img>
                                    <span>
                                        {product.title}
                                        <p>
                                        {product.price * product.quantity} $
                                        </p>
                                    </span>
                                </div>
                            </>
                    ))}
                                    <span className="grand-total">
                                            Grand Total
                                        <p>
                                        {total.toFixed(2)} $
                                        </p>
                                    </span>
                            </div>
                        </div>
                </div>
    </div>
)};