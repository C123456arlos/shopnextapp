import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { setProductQuantity } from "./actions"
import { formatPrice } from "@/lib/format"

export const metadata = {
    title: 'cart - shop'
}
export default async function CartPage() {
    const cart = await getCart()
    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">shopping cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}></CartEntry>
            ))}
            {!cart?.items.length && <p>your cart is empty</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    total : {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">checkout</button>
            </div>
        </div>
    )
}
