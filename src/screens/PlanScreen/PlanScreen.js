import React from 'react'
import { useStateContext } from '../../contexts/StateContextProvider'
import './PlanScreen.css'

const PlanScreen = () => {
    const { products, subscription, loadCheckOut } = useStateContext()

    return (
        <div className='planScreen'>
        <h3>{!subscription ? 'Plan' : `Current Plan: (${subscription?.role})`}</h3>
            <hr
                style={{
                    color: 'gray',
                    backgroundColor: 'gray',
                    height: '0.1px',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
            />
            {subscription && 
                <p>
                    Renewal Date: {}
                    {
                        new Date(subscription?.current_period_end * 1000)
                        .toLocaleDateString()
                    }
                </p>}
            {/* es6 functionality */}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if the user subscription is active...
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role)

                return (
                    <div 
                        key={productId} 
                        className={`${isCurrentPackage && 'profileScreen__plan--disabled'
                        } profileScreen__plan`}
                    >
                        <div className='planScreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        {/* <button onClick={() =>loadCheckOut(productData.prices.priceId)}> */}
                        <button onClick={() => 
                            !isCurrentPackage && loadCheckOut(productData.prices.priceId)}
                        >
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                )
            })}

        </div>
    )
}

export default PlanScreen