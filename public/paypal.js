paypal.Buttons({
    style: {
        color: 'blue',
        shape: 'pill'
    }, 
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '50'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            console.log(details)
            window.location.replace("paymentSuccess.html")
        })
    },
    onCancel: function(data) {
        window.location.replace("paymentFail.html")
    }
}).render('#paypal-button');