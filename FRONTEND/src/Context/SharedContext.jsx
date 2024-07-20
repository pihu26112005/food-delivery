/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";


export const SharedContext = createContext(null); //s1) create context , which is used to access vbalue in diff components

const SharedContextProvider = (props) => { //s2) create context provider

    const URL = 'http://localhost:3001';

    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function loaddata() {
            await fetchfoodlist();

            if (token) {
                loadCartData(token);
            }
        }
        loaddata();

        if (token) {
            setToken(token);
        }

    }, [])

    const [cartitems, setCartitems] = useState({});

    const addtocart = (itemID) => {
        if (cartitems[itemID]) {
            setCartitems({
                ...cartitems,
                [itemID]: cartitems[itemID] + 1
            })
        } else {
            setCartitems({
                ...cartitems,
                [itemID]: 1
            })
        }
        console.log("tpken", token)

        if (token) {
            const res = axios.post(URL + "/api/cart/add", { itemID }, { headers: {token}})
            if(res.status === 400){
                alert(res.msg)
            }
        }
    }

    const removefromcart = (itemID) => {
        if (cartitems[itemID] === 1) {
            const newcartitems = { ...cartitems }
            delete newcartitems[itemID]
            setCartitems(newcartitems)
        } else {
            setCartitems({
                ...cartitems,
                [itemID]: cartitems[itemID] - 1
            })
        }

        if (token) {
            axios.post(URL + "/api/cart/remove", { itemID }, { headers: {token}})
        }
    }

    const gettotalamount = () => {
        let total = 0;
        for (const itemID in cartitems) {
            total += food_list.find((food) => food._id === itemID).price * cartitems[itemID]
        }
        return total;
    }



    const [food_list, setFood_list] = useState([])

    const fetchfoodlist = async () => {
        const res = await axios.get(URL + "/api/food/list"); // ise upar useeffect chala rha hai
        setFood_list(res.data);
    }

    const loadCartData = async (token) => {
        const res = await axios.post(URL + "/api/cart/get",{}, { headers: {token} });
        setCartitems(res.data.cartData);
    }



    const Contextvalue = {
        food_list,
        cartitems,
        setCartitems,
        addtocart,
        removefromcart,
        gettotalamount,
        URL,
        token,
        setToken
    }

    return ( //s3) pass value to context provider and export the provider
        <SharedContext.Provider value={Contextvalue}>
            {props.children}
        </SharedContext.Provider>
    )
};

export default SharedContextProvider;

//s4) import the provider in main.jsx and wrap the app component with it

//s5) use the context.value using the name of context and useContext hook