/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const { BigQuery } = require('@google-cloud/bigquery');
  const tag = req.body.fulfillmentInfo.tag;

  async function calculatePayment() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let sql = `SELECT SUM(CAST(amount AS int)) AS totalAmount
      FROM \`RBHmockupDB.Transaction_Records\`
      WHERE user_id = '1'`;
    const options = {
      query: sql,
    };
    const [total_amount] = await bigqueryClient.query(options)
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "totalamount": total_amount[0],
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  if (tag==='calculatePayment') {
    calculatePayment();
  }
};
