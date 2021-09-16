import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import '../styles/ItemDetail.css'
import Cart from "./Cart"
function ItemDetail(props) {
    const [item, setItem] = useState(null)
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems')) !== null?JSON.parse(localStorage.getItem('cartItems')):[]
    
    const [cartItems, setCartItems] = useState(cartItemsInLocalStorage)

    useEffect(() => {
        callApi()

        
      }, []);
    const callApi = async (keyword, page) => {
        const itemCode = props.match.params.itemCode
        const applicationId = "1074305052326638295"
        const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&itemCode=${itemCode}&applicationId=${applicationId}`
        const response = await axios.get(endpoint)
        if (response.data.Items.length > 0) {
            setItem(response.data.Items[0].Item)
            console.log(response.data.Items[0].Item)
        }
    }

    const onAdd = (item) => {
        const exist = cartItems.find((x) => x.itemCode === item.itemCode);
        if (exist) {
            var newCartItems = cartItems.map((x) =>
                    x.itemCode === item.itemCode ? { ...exist, qty: exist.qty + 1 } : x
                )
            localStorage.setItem('cartItems', JSON.stringify(newCartItems))
            setCartItems(newCartItems);
        } else {
            var newCartItems = [...cartItems, { ...item, qty: 1 }]
            localStorage.setItem('cartItems', JSON.stringify(newCartItems))
            setCartItems(newCartItems);
        }
      };



    return (
        <>
        {item !== null?
        <div className="item-container">
            <div className="item-detail">
                <div className="image-wrapper">
                    <img src={item.mediumImageUrls[0].imageUrl} />
                </div>
                <div class="item-description">
                    <h2>{item.itemName}</h2>
                    <div className="item-purchace">
                        <p>Price: {item.itemPrice} yen</p>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="disabled" value={item.reviewAverage} disabled />
                        </Box>
                        <Button variant="contained" color="secondary" onClick={() => onAdd(item)}>
                            Add to Cart
                        </Button>
                    </div>
                    <p style={{"textAlign": "left"}}>Description</p>
                    <p>{item.itemCaption}</p>
                </div>
                <div className="cart">
                <Cart cartItems={cartItems} setCartItems={setCartItems} onAdd={onAdd}/>
                </div>

            </div>
        </div>
        :<></>}
        </>
    )
}

export default ItemDetail