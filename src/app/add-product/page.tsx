import FormSubmitButton from "@/components/FormSubmitButton"
import { prisma } from "@/lib/db/prisma"
import { redirect } from 'next/navigation'
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
export const metadata = {
    title: 'add product'
}
async function addProduct(formData: FormData) {
    'use server'
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product')
    }
    const name = formData.get('name')?.toString()
    const description = formData.get('description')?.toString()
    const imageUrl = formData.get('imageUrl')?.toString()
    const price = Number(formData.get('price') || 0)

    if (!name || !description || !imageUrl || !price) {
        throw Error('missing required')
    }
    // for (let i = 0; i < 50; i++) {

    // }
    await prisma.product.create({
        data: { name, description, imageUrl, price }
    })
    redirect('/')
}
export default async function AddProductPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product')
    }
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">add product</h1>
            <form action={addProduct}>
                <input required name='name' placeholder="name" className="mb-3 w-full input input-bordered"></input>
                <textarea required name="description" placeholder="description" className="textarea textarea-bordered mb-3 w-full"></textarea>
                <input required name='imageUrl' placeholder="Image Url" type="url" className="mb-3 w-full input input-bordered"></input>
                <input required name='price' placeholder="price" type="number" className="mb-3 w-full input input-bordered"></input>
                <FormSubmitButton className="btn-block">add product</FormSubmitButton>
            </form>
        </div>
    )
}




// import FormSubmitButton from "@/components/FormSubmitButton";
// import { prisma } from "@/lib/db/prisma";
// import { redirect } from "next/navigation";

// export const metadata = {
//     title: "Add Product - Flowmazon",
// };

// async function addProduct(formData: FormData) {
//     "use server";

//     const name = formData.get("name")?.toString();
//     const description = formData.get("description")?.toString();
//     const imageUrl = formData.get("imageUrl")?.toString();
//     const price = Number(formData.get("price") || 0);

//     if (!name || !description || !imageUrl || !price) {
//         throw Error("Missing required fields");
//     }

//     await prisma.product.create({
//         data: { name, description, imageUrl, price },
//     });

//     redirect("/");
// }

// export default function AddProductPage() {
//     return (
//         <div>
//             <h1 className="mb-3 text-lg font-bold">Add Product</h1>
//             <form action={addProduct}>
//                 <input
//                     required
//                     name="name"
//                     placeholder="Name"
//                     className="input-bordered input mb-3 w-full"
//                 />
//                 <textarea
//                     required
//                     name="description"
//                     placeholder="Description"
//                     className="textarea-bordered textarea mb-3 w-full"
//                 />
//                 <input
//                     required
//                     name="imageUrl"
//                     placeholder="Image URL"
//                     type="url"
//                     className="input-bordered input mb-3 w-full"
//                 />
//                 <input
//                     required
//                     name="price"
//                     placeholder="Price"
//                     type="number"
//                     className="input-bordered input mb-3 w-full"
//                 />
//                 <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
//             </form>
//         </div>
//     );
// }