const axios = require("axios")

exports.handler = function(event, context, callback){
    const { API_Client_ID, API_Client_Secrets, API_URL} = process.env;

    const url = `${API_URL}?client_id=${API_Client_ID}&client_secret=${API_Client_Secrets}`

    // send the user response
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin': "*",
                "Access-Control-Allow-Headers":"Origin, X-Request-With, Content-Type, Accept"
            },
            body:JSON.stringify(body)
        })
    }

    // function to perforn api call
    const getUsers = () => {
        axios.get(url)
            .then(res => send(res.data))
            .catch(err => send(err))
    }

    // make sur methos is get
    if(event.httpMethod == "GET"){
        getUsers()
    }
}