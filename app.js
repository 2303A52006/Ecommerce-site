/* app.js – simple version for 10 products only */

// --- 10 PRODUCTS ---
const products = [
  { id: 1, name: "Shoes", price: 999,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop",
    desc: "Comfortable red Nike running shoes."
  },

  { id: 2, name: "Headphones", price: 1999,
    img: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop",
    desc: "Premium wireless noise-cancelling headphones."
  },

  { id: 3, name: "Backpack", price: 899,
    img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=688&auto=format&fit=crop",
    desc: "Durable waterproof travel backpack."
  },

  { id: 4, name: "Perfume", price: 1299,
    img: "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1174&auto=format&fit=crop",
    desc: "Long-lasting premium fragrance."
  },

  { id: 5, name: "Sunglasses", price: 499,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop",
    desc: "UV-protection black Ray-Ban style sunglasses."
  },

  { id: 6, name: "Wallet", price: 399,
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=687&auto=format&fit=crop",
    desc: "Brown leather men’s wallet."
  },

  /* ---- PRODUCTS YOU DID NOT PROVIDE IMAGES FOR — I completed them ---- */

  { id: 7, name: "Watch", price: 1499,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    desc: "Stylish analog wrist watch."
  },

  { id: 8, name: "T-shirt", price: 499,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1080&auto=format&fit=crop",
    desc: "Cotton casual t-shirt."
  },

  { id: 9, name: "Lamp", price: 699,
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1080&auto=format&fit=crop",
    desc: "Modern LED study lamp."
  },

  { id: 10, name: "Laptop Sleeve", price: 899,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1080&auto=format&fit=crop",
    desc: "Shockproof laptop sleeve."
  }
];

// Return all products
function loadProducts(){
  return products;
}

/* --- CART FUNCTIONS (simple) --- */

function loadCart(){
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id){
  const cart = loadCart();
  const item = cart.find(c => c.id === id);
  if(item) item.qty++;
  else cart.push({ id, qty:1 });
  saveCart(cart);
}

function removeFromCart(id){
  let cart = loadCart();
  cart = cart.filter(c => c.id !== id);
  saveCart(cart);
}

function cartItemsDetailed(){
  return loadCart().map(c => {
    const p = products.find(p => p.id === c.id);
    return { ...p, qty: c.qty, total: p.price * c.qty };
  });
}

function cartTotal(){
  return cartItemsDetailed().reduce((s, i) => s + i.total, 0);
}

/* --- CART BADGE COUNTER --- */
function updateCartBadge(){
  const el = document.getElementById("cart-badge");
  if(!el) return;
  const count = loadCart().reduce((s, i)=>s + i.qty, 0);
  el.textContent = count > 0 ? count : "";
}

/* --- FORMAT PRICE --- */
function fmt(n){
  return "₹" + n.toLocaleString("en-IN");
}

/* --- EXPORT SHOP OBJECT --- */
window.shop = {
  loadProducts,
  addToCart,
  removeFromCart,
  cartItemsDetailed,
  cartTotal,
  updateCartBadge,
  fmt
};
