const steps = [
    {
        name: 'Sign in',
        path: '/login'
    },
    {
        name: 'Shipping',
        path: '/shipping'
    },
    {
        name: 'Payment',
        path: '/payment'
    },
    {
        name: 'Place Order',
        path: '/order'
    }
]

export const getShippingSteps = (protectedSteps) => {
    return steps.map(step => {
        if (protectedSteps.includes(step.path)) {
            return {
                ...step,
                protected: true
            }
        }

        return step;
    })
}