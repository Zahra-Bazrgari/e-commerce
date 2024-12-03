// "use client"
// import { useFetchOrders } from '@/hooks/useQuery/useFetchOrders';
// import React, { useState } from "react";


// const OrdersPage = () => {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading, isError } = useFetchOrders(page, limit);

//   if (isLoading) return <div>Loading orders...</div>;
//   if (isError) return <div>Failed to load orders. Please try again.</div>;

//   const orders = data?.data?.orders || [];
//   const totalPages = data?.total_pages || 1;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Orders</h1>

//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Order ID</th>
//             <th className="border px-4 py-2">User</th>
//             <th className="border px-4 py-2">Products</th>
//             <th className="border px-4 py-2">Total Price</th>
//             <th className="border px-4 py-2">Delivery Date</th>
//             <th className="border px-4 py-2">Delivery Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order: any) => (
//             <tr key={order._id}>
//               <td className="border px-4 py-2">{order._id}</td>
//               <td className="border px-4 py-2">{order.user}</td>
//               <td className="border px-4 py-2">
//                 {order.products.map((product: any, index: number) => (
//                   <div key={index}>
//                     <p>Product ID: {product.product}</p>
//                     <p>Count: {product.count}</p>
//                   </div>
//                 ))}
//               </td>
//               <td className="border px-4 py-2">{order.totalPrice}</td>
//               <td className="border px-4 py-2">
//                 {new Date(order.deliveryDate).toLocaleDateString()}
//               </td>
//               <td className="border px-4 py-2">
//                 {order.deliveryStatus ? "Delivered" : "Pending"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-4 flex justify-center space-x-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((prev) => prev - 1)}
//           className={`px-4 py-2 rounded bg-gray-800 text-white ${
//             page === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setPage(i + 1)}
//             className={`px-4 py-2 rounded ${
//               page === i + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((prev) => prev + 1)}
//           className={`px-4 py-2 rounded bg-gray-800 text-white ${
//             page === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
