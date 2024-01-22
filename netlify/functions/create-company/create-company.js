// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios')
// const brevoClientKey = 'hrg47x0s7k9e0le4uxx4m0si'

const handler = async (event) => {
  try {
    console.log('hii')
    console.log(event)
    const subject = event.queryStringParameters.name || 'World'
    const bodyRequest = JSON.parse(event.body)
    const companyName = bodyRequest.company
    // const FIRSTNAME = bodyRequest.FIRSTNAME
    // const LASTNAME = bodyRequest.LASTNAME

    const options = {
        method: 'POST',
        url: 'https://api.brevo.com/v3/companies',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': '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'
        },
        data: {
            companyName
        }
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
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
