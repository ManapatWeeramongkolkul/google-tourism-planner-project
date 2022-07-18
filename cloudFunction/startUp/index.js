/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const { BigQuery } = require('@google-cloud/bigquery');
  const tag = req.body.fulfillmentInfo.tag;
  async function deleteOnStartUp() {
    const bigqueryClient = new BigQuery();
    let sql = `DELETE FROM \`RBHmockupDB.Event_Recorder\`
      WHERE user_id = '1'`
    let options = {
      query: sql,
    };
    let [placeholder] = await bigqueryClient.query(options);
    sql = `DELETE FROM \`RBHmockupDB.Transaction_Records\`
      WHERE user_id = '1'`
    options = {
      query: sql,
    };
    [placeholder] = await bigqueryClient.query(options);
    console.log("Complete start up deletion")
    res.status(200).send();   
  }
  if (tag==='deleteOnStartUp')
    deleteOnStartUp()
}