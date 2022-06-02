// import firebase from "firebase/compat/app";
// import { useState } from "react";
// import { db } from "../firebase";
// import getStripe from "./initializeStripe";

// export async function createCheckoutSession(uid) {
//   const firestore = firebase.firestore();
//   const [products, setProducts] = useState([])

//     db.collection('products')
//     .where('active', '==', true)
//     .get()
//     .then((querySnapshot) => {
//         const products = {}
//         querySnapshot.forEach(async (productDoc) => {
//             // console.log(productDoc.id, ' => ', productDoc.data());
//             products[productDoc.id] = productDoc.data()
//             const priceSnap = await productDoc.ref.collection('prices').get()
//             priceSnap.docs.forEach((price) => {
//                 // console.log(productDoc.id, ' => ', productDoc.data());
//                 products[productDoc.id].prices = {
//                     priecId: price.id,
//                     priceData: price.data()
//                 }
//             })
//         })
//         setProducts(products.priecId)
//     })
        

//   // Create a new checkout session in the subollection inside this users document
//   const checkoutSessionRef = await firestore
//     .collection('customers')
//     .doc(uid)
//     .collection('checkout_sessions')
//     .add({
//       // replace the price_XXX value with the correct value from your product in stripe.
//     //   line_items: [
//     //       {
//     //         price: 'price_1L5634LdXsnOzxgtOY814rhq',
//     //         quantity: 1
//     //       },
//     //       {
//     //         price: 'price_1L563ILdXsnOzxgtXqYtH6xC',
//     //         quantity: 1
//     //       },
//     //       {
//     //         price: 'price_1L563XLdXsnOzxgtyJ6wbcoI', 
//     //         quantity: 1,
//     //       },
//     //   ],
//       price: priecId,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     });

//   // Wait for the CheckoutSession to get attached by the extension
//   checkoutSessionRef.onSnapshot(async (snap) => {
//     const { sessionId } = snap.data();
//     if (sessionId) {
//       // We have a session, let's redirect to Checkout
//       // Init Stripe
//       const stripe = await getStripe();
//       stripe.redirectToCheckout({ sessionId });
//     }
//   });
// }