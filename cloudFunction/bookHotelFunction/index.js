/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const { BigQuery } = require('@google-cloud/bigquery');
  const tag = req.body.fulfillmentInfo.tag;
  async function formatDate(date) {
    const a = date.year
    const b = date.month
    const c = date.day
    return `${a}-${b}-${c}`
  }

  async function queryHotelOptions() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let hotel_city = req.body.sessionInfo.parameters.hotelcity
    let hotel_roomno = req.body.sessionInfo.parameters.hotelroomno
    let sql
    sql = `SELECT hotel_name AS hotelName, hotel_id AS hotelID, price, room_no AS roomAvail
      FROM \`RBHmockupDB.Hotels\`
      WHERE hotel_city = @hotel_city AND room_no > @hotel_roomno
      LIMIT 6`;
    const options = {
      query: sql,
      params: {hotel_city: hotel_city, hotel_roomno: hotel_roomno}
    };
    const [hotels] = await bigqueryClient.query(options)
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "list",
                    "title": `Option 1: ${hotels[0].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[0].hotelName}\nCost Per Night: ${hotels[0].price}\nRooms Available: ${hotels[0].roomAvail}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 2: ${hotels[1].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[1].hotelName}\nCost Per Night: ${hotels[1].price}\nRooms Available: ${hotels[1].roomAvail}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 3: ${hotels[2].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[2].hotelName}\nCost Per Night: ${hotels[2].price}\nRooms Available: ${hotels[2].roomAvail}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 4: ${hotels[3].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[3].hotelName}\nCost Per Night: ${hotels[3].price}\nRooms Available: ${hotels[3].roomAvail}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 5: ${hotels[4].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[4].hotelName}\nCost Per Night: ${hotels[4].price}\nRooms Available: ${hotels[4].roomAvail}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 6: ${hotels[5].hotelName}`,
                    "subtitle": `Hotel Name: ${hotels[5].hotelName}\nCost Per Night: ${hotels[5].price}\nRooms Available: ${hotels[5].roomAvail}`,
                  }
                ]
              ]
            }
          }
        ]
      },
      "session_info": {
          "session": session_name,
          "parameters": {
              "optionA": hotels[0],
              "optionB": hotels[1],
              "optionC": hotels[2],
              "optionD": hotels[3],
              "optionE": hotels[4],
              "optionF": hotels[5],
          }
        }
    }
    res.status(200).send(jsonResponse);
  }

  async function setOptionParam() {
    let session_name = req.body.sessionInfo.session
    let selectedOption = req.body.sessionInfo.parameters.options
    let info
    if (selectedOption==='A')
      info = req.body.sessionInfo.parameters.optionA
    if (selectedOption==='B')
      info = req.body.sessionInfo.parameters.optionB 
    if (selectedOption==='C')
      info = req.body.sessionInfo.parameters.optionC
    if (selectedOption==='D')
      info = req.body.sessionInfo.parameters.optionD
    if (selectedOption==='E')
      info = req.body.sessionInfo.parameters.optionE
    if (selectedOption==='F')
      info = req.body.sessionInfo.parameters.optionF   
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "hotelname": info.hotelName,
              "amount": info.price,
              "hotelid": info.hotelID,
              "hotelroomavail": info.roomAvail
          }
        }
    }
    res.status(200).send(jsonResponse);         
  }

  async function saveTransaction() {
    const bigqueryClient = new BigQuery();
    let amount_raw = req.body.sessionInfo.parameters.amount
    let room_no = req.body.sessionInfo.parameters.hotelroomno
    let amount_final = room_no * amount_raw
    let hotel_id = req.body.sessionInfo.parameters.hotelid
    let sql = `INSERT INTO \`RBHmockupDB.Transaction_Records\`
      VALUES ('1','book_hotel', @amount_final, @hotel_id)`;
    const options = {
      query: sql,
      params: {amount_final: amount_final.toString(), hotel_id: hotel_id}
    };
    const [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  if (tag==='getHotelOptions') {
    queryHotelOptions();
  }
  if (tag==='setOptionParam') {
    setOptionParam();
  }
  if (tag==='saveTransaction') {
    saveTransaction();
  }
};
