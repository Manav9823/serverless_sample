const axios = require('axios')
const brevoClientKey = 'hrg47x0s7k9e0le4uxx4m0si'

const handler = async (event) => {
    console.log('hii')
    // const subject = event.queryStringParameters.name || 'World'
    const bodyRequest = JSON.parse(event.body)
    const email = bodyRequest.email
    const FIRSTNAME = bodyRequest.FIRSTNAME
    const LASTNAME = bodyRequest.LASTNAME

    const options = {
        method: 'POST',
        url: 'https://in-automate.brevo.com/api/v2/identify',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'ma-key': brevoClientKey
        },
        data: {
            attributes: { FIRSTNAME, LASTNAME },
            email
        }
    };
    try{
      const response = await axios(options)
      return{
        statusCode: 200,
        body: JSON.stringify(response.data) 
      }
    } catch(error) {
      return {
        statusCode: 422,
        body: `Error: ${error}`
      }
    }
  }

module.exports = { handler }
