import React , { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../firebase'
import { loadStripe } from '@stripe/stripe-js'
// import { createCheckoutSession } from '../../lib/stripe'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscrption] = useState(null)
    
    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscrption({ 
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])
    console.log(subscription)
    
    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {}
            querySnapshot.forEach(async (productDoc) => {
                // console.log(productDoc.id, ' => ', productDoc.data());
                products[productDoc.id] = productDoc.data()
                const priceSnap = await productDoc.ref.collection('prices').get()
                priceSnap.docs.forEach((price) => {
                    // console.log(productDoc.id, ' => ', productDoc.data());
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
            setProducts(products)
        })
    }, [])
    console.log(products)
    
    const loadCheckOut = async (priceId) => {
        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
            })
            docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()
            if (error) {
                // show error to your customer
                // inspect your cloud funciton logs in the firebase console
                alert(`An error occured ${error.message}`)
            }
            if (sessionId) {
                // We have a session, Let's redirect to checkout
                // Init stripe
                const stripe = await loadStripe('pk_test_51L6Go1BxVqRye5VxZPbnly4sF4bZqbTlfrUIWRuMLHVtbFJK8eRq2Y9HF9UeMhG7v98Y1XlxENUjESMt4SymxfAD0070NFB2zn')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    return (
        <StateContext.Provider value={{ products, subscription, loadCheckOut }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)