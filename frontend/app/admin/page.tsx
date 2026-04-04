"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard(){

 const router = useRouter()
 const [products,setProducts] = useState([])

 useEffect(()=>{

  const token = localStorage.getItem("adminToken")

  if(!token){
   router.push("/admin-login")
   return
  }

  fetch("http://localhost:5000/api/products")
   .then(res=>res.json())
   .then(data=>setProducts(data))

 },[])

 const handleDelete = async(id:number)=>{

  const confirmDelete = confirm("Delete product?")

  if(!confirmDelete) return

  await fetch(`http://localhost:5000/api/products/${id}`,{
   method:"DELETE"
  })

  setProducts(products.filter((p:any)=>p.id!==id))

 }

 return(

<div className="admin-container">

 <main className="admin-main">

  <h1>Admin Dashboard</h1>

  <div className="stats">

   <div className="card">
     <h3>{products.length}</h3>
     <p>Products</p>
   </div>

   <div className="card">
     <h3>0</h3>
     <p>Orders</p>
   </div>

   <div className="card">
     <h3>$0</h3>
     <p>Revenue</p>
   </div>

  </div>

  <h2>Product List</h2>

  <table className="admin-table">

   <thead>
    <tr>
     <th>ID</th>
     <th>Name</th>
     <th>Price</th>
     <th>Action</th>
    </tr>
   </thead>

   <tbody>

   {products.map((p:any)=>(
    <tr key={p.id}>

     <td>{p.id}</td>
     <td>{p.name}</td>
     <td>{p.price}</td>

     <td>

      <button
       className="edit-btn"
       onClick={()=>router.push(`/admin/edit-product/${p.id}`)}
      >
       Edit
      </button>

      <button
       className="delete-btn"
       onClick={()=>handleDelete(p.id)}
      >
       Delete
      </button>

     </td>

    </tr>
   ))}

   </tbody>

  </table>

 </main>

</div>

 )
}