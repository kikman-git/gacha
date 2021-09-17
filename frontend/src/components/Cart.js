  
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';

export default function Cart(props) {
  const {cartItems, setCartItems, onAdd} = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.itemPrice, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;


  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.itemCode === product.itemCode);
    if (exist.qty === 1) {
        var newCartItems = cartItems.filter((x) => x.itemCode !== product.itemCode) 
        console.log(newCartItems)
        localStorage.setItem('cartItems', JSON.stringify(newCartItems))
        setCartItems(newCartItems);
    } else {
        var newCartItems = cartItems.map((x) =>
        x.itemCode === product.itemCode ? { ...exist, qty: exist.qty - 1 } : x)
        console.log(newCartItems)
        localStorage.setItem('cartItems', JSON.stringify(newCartItems))
        setCartItems(newCartItems);
    }
  };
  return (
    <aside className="block col-1">
      <h2>Cart Items<ShoppingCartIcon/></h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.itemCode} className="row">
            <div className="col-2">{item.itemName}</div>
            <div className="col-2">
                <IconButton onClick={() => onRemove(item)} className="remove">
                    <RemoveCircleIcon/>
               </IconButton>{' '}
              <IconButton onClick={() => onAdd(item)} className="add">
                    <AddCircleIcon/>
               </IconButton>
            </div>

            <div className="col-2 text-right">
              {item.qty} x {item.itemPrice.toFixed(2)}yen
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">{itemsPrice.toFixed(2)}yen</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">{taxPrice.toFixed(2)}yen</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                {shippingPrice.toFixed(2)}yen
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>{totalPrice.toFixed(2)}yen</strong>
              </div>
            </div>
            <hr />
            <div className="row">
            <Button variant="contained" color="primary" onClick={() => alert('Implement Checkout!')}>
                CheckOut
                </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}