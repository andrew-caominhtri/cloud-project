"use client"

import { useState,useEffect } from "react"
import { useRouter,useParams } from "next/navigation"

export default function EditProduct(){

 const router = useRouter()
 const params = useParams()

 const id = params.id

 const [name,setName] = useState("")
 const [price,setPrice] = useState("")
 const [image,setImage] = useState("")
 const [description,setDescription] = useState("")

 useEffect(()=>{

  fetch("http://localhost:5000/api/products")
   .then(res=>res.json())
   .then(data=>{

    const product = data.find((p:any)=>p.id == id)

    if(product){
     setName(product.name)
     setPrice(product.price)
     setImage(product.image)
     setDescription(product.description)
    }

   })

 },[])

 const handleUpdate = async ()=>{

  await fetch(`http://localhost:5000/api/products/${id}`,{

   method:"PUT",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    name,
    price,
    image,
    description
   })

  })

  alert("Product updated")

  router.push("/admin")

 }

 return(

 <div style={{padding:"40px"}}>

  <h2>Update Product</h2>

  <input
   value={name}
   onChange={(e)=>setName(e.target.value)}
   placeholder="Product name"
  />

  <br/><br/>

  <input
   value={price}
   onChange={(e)=>setPrice(e.target.value)}
   placeholder="Price"
  />

  <br/><br/>

  <input
   value={image}
   onChange={(e)=>setImage(e.target.value)}
   placeholder="Image"
  />

  <br/><br/>

  <textarea
   value={description}
   onChange={(e)=>setDescription(e.target.value)}
   placeholder="Description"
  />

  <br/><br/>

  <button onClick={handleUpdate}>
   Update
  </button>

  <button
   onClick={()=>router.push("/admin")}
   style={{marginLeft:"10px"}}
  >
   Cancel
  </button>

 </div>

 )
}