const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY


sgMail.setApiKey(sendgridAPIKey)


const sendMail = (email, name)=> {
sgMail.send({
    to:email,
    from:"krishnakanthb@pavotusker.com",
    subject:"Thanks For Joining In!!!!",
    text:`Welcome to the task manager app, ${name}.`

})
}


const cancelMail = (email, name)=> {
    sgMail.send({
        to:email,
        from:"krishnakanthb@pavotusker.com",
        subject:"Thanks For Joining In!!!!",
        text:`Your Account is removed ${name}.`
    
    })
    }

module.exports = {
    sendMail,cancelMail
}

