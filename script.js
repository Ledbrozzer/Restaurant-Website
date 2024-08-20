//(Node.js):
//open t-folder where your project is, use t-directory
//w/ command:
//    cmd
//    npm init -y

//install->tailwind:
//     npm install -D tailwindcss
//     npx tailwindcss init

//criar arqv de config.. tailwindconfig.js
// tem q passar o caminho do arquv:
//  content: ["./**/*.{}html.js"],
// qlq arqv da pasta raiz, ou, dentro dessa pasta raiz-> vai poder usar

//no 'package.json' -> apagar o " "test": "echo \"Error: no test specified\" && exit 1" "
// e colar no script, comand p/ rodar:
//     "dev": "npx tailwindcss -1 ./src/output.css --watch"

// tem q passar o arquivo global:
//      "dev": "npx tailwindcss -i ./styles/style.css -o ./src/output.css --watch"

//o './src/output.css' é a onde vai ser gerado o arquivo c/ o tailwind.css:
//      "dev": "npx tailwindcss -i ./styles/style.css -o ./styles/output.css --watch"

//pode ir rodar o arqv-> c/ nome q eu dei
//node:
//      npm run dev
//
const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
    
})


cartModal.addEventListener("click", function(event){
    //console.log(event);
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})


closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    //console.log(parentButton);

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        //console.log(name)
        //console.log(price)
        addToCart(name, price)
    }
})

function addToCart(name, price){
    //alert("Item " + name)

    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //console.log(existingItem)
        existingItem.quantity += 1;
        //return;

    } else{

        cart.push({
            name, 
            price,
            quantity: 1,
        })

    }

    updateCartModal()
}

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">$ ${item.price.toFixed(2)}</p>
                </div>

                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remove
                    </button>

            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("en", {
        style: "currency",
        currency: "USD"
    });

    cartCounter.innerHTML = cart.length;

}

cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        //console.log(name);
        removeItemCart(name);
    }

})

function removeItemCart(name){
    const index =cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        //console.log(item);

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();
    if(isOpen){
        Toastify({
            text: "We are closed!",
            duration: 3000,
            //destination: "https://github.com/apvarun/toastify-js",
            //newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",//"linear-gradient(to right, #00b09b, #96c93d)",
            },
            //onClick: function(){} // Callback after click
          }).showToast();
        //alert("We are closed!")
        
        return;
    }

    if(cart.lenght === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    //console.log(cart);

    const cartitems = cart.map((item) => {
        return (
            `${item.name} Quantity: (${item.quantity}) Price: $${item.price} |`
        )
    }).join("")

    //console.log(cartitems);
    const message = encodeURIComponent(cartitems)
    const phone = ""

    window.open(`https://wa.me/${phone}?text=${message} Address: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

function checkRestaurantOpen(){
    const date = new Date();
    const hour = date.getHours();
    return hour >= 9 && hour < 23;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

//'Ctrl + C'
//      git init
//      git add .
//      git commit -m "Restaurant Website"

//verceL.com