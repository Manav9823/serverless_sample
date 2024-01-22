// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios')
const brevoClientKey = 'hrg47x0s7k9e0le4uxx4m0si'

const handler = async (event) => {
  try {
    console.log('hii')
    // console.log(event)
    const subject = event.queryStringParameters.name || 'World'
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

    axios
        .request(options)
        .then(function (response) {
            console.log('response from brevo', response.data);
        })
        .catch(function (error) {
            console.error('error from brevo', error);
        });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
