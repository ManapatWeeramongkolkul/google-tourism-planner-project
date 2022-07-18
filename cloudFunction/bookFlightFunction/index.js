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

  async function queryFlightsOptionOneWay() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let airport_depart = req.body.sessionInfo.parameters.flightairportstart
    let airport_arrive = req.body.sessionInfo.parameters.flightairportdestination
    let depart_date = req.body.sessionInfo.parameters.flightdate
    let date_formatted = await formatDate(depart_date)
    let sql = `SELECT flight_id, depart_day, depart_time, arrive_day, arrive_time, airline, price
        FROM \`RBHmockupDB.Flights_OneWay\` 
        WHERE airport_depart = @airport_depart AND airport_arrive = @airport_arrive AND depart_day >= @date_formatted
        ORDER BY depart_day
        LIMIT 6`;
    const options = {
      query: sql,
      params: {airport_depart: airport_depart, airport_arrive: airport_arrive, date_formatted, date_formatted}
    };
    const [flights] = await bigqueryClient.query(options)
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "list",
                    "title": `Option 1: ${flights[0].flight_id}`,
                    "subtitle": `Airline: ${flights[0].airline}\nPrice: ${flights[0].price}\nDepart Date: ${flights[0].depart_day.value}\nDepart Time: ${flights[0].depart_time.value}\nArrive Date: ${flights[0].arrive_day.value}\nArrive Time: ${flights[0].arrive_time.value}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 2: ${flights[1].flight_id}`,
                    "subtitle": `Airline: ${flights[1].airline}\nPrice: ${flights[1].price}\nDepart Date: ${flights[1].depart_day.value}\nDepart Time: ${flights[1].depart_time.value}\nArrive Date: ${flights[1].arrive_day.value}\nArrive Time: ${flights[1].arrive_time.value}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 3: ${flights[2].flight_id}`,
                    "subtitle": `Airline: ${flights[2].airline}\nPrice: ${flights[2].price}\nDepart Date: ${flights[2].depart_day.value}\nDepart Time: ${flights[2].depart_time.value}\nArrive Date: ${flights[2].arrive_day.value}\nArrive Time: ${flights[2].arrive_time.value}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 4: ${flights[3].flight_id}`,
                    "subtitle": `Airline: ${flights[3].airline}\nPrice: ${flights[3].price}\nDepart Date: ${flights[3].depart_day.value}\nDepart Time: ${flights[3].depart_time.value}\nArrive Date: ${flights[3].arrive_day.value}\nArrive Time: ${flights[3].arrive_time.value}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 5: ${flights[4].flight_id}`,
                    "subtitle": `Airline: ${flights[4].airline}\nPrice: ${flights[4].price}\nDepart Date: ${flights[4].depart_day.value}\nDepart Time: ${flights[4].depart_time.value}\nArrive Date: ${flights[4].arrive_day.value}\nArrive Time: ${flights[4].arrive_time.value}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 6: ${flights[5].flight_id}`,
                    "subtitle": `Airline: ${flights[5].airline}\nPrice: ${flights[5].price}\nDepart Date: ${flights[5].depart_day.value}\nDepart Time: ${flights[5].depart_time.value}\nArrive Date: ${flights[5].arrive_day.value}\nArrive Time: ${flights[5].arrive_time.value}`,
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
              "optionA": flights[0],
              "optionB": flights[1],
              "optionC": flights[2],
              "optionD": flights[3],
              "optionE": flights[4],
              "optionF": flights[5],
          }
        }
    }
    res.status(200).send(jsonResponse);
  }

async function queryFlightsOptionRound() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let airport_depart = req.body.sessionInfo.parameters.flightairportstart
    let airport_arrive = req.body.sessionInfo.parameters.flightairportdestination
    let depart_date = req.body.sessionInfo.parameters.flightdate
    let date_formatted = await formatDate(depart_date)
    let sql = `SELECT flight_id, airport_depart1, airport_arrive1, depart_day1, depart_time1, arrive_day1, arrive_time1, airline1, flight_id2, airport_depart2, airport_arrive2, depart_day2, depart_time2, arrive_day2, arrive_time2, airline2, price
        FROM \`RBHmockupDB.Flights_Round\` 
        WHERE airport_depart1 = @airport_depart AND airport_arrive1 = @airport_arrive AND depart_day1 >= @date_formatted
        ORDER BY depart_day1
        LIMIT 6`;
    const options = {
      query: sql,
      params: {airport_depart: airport_depart, airport_arrive: airport_arrive, date_formatted, date_formatted}
    };
    const [flights] = await bigqueryClient.query(options)
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "list",
                    "title": `Option 1: ${flights[0].flight_id} and ${flights[0].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[0].airport_depart1} to\n${flights[0].airport_arrive1}\nFlight Code: ${flights[0].flight_id}\nAirline: ${flights[0].airline1}\nDepart Date: ${flights[0].depart_day1.value}\nDepart Time: ${flights[0].depart_time1.value}\nArrive Date: ${flights[0].arrive_day1.value}\nArrive Time: ${flights[0].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[0].airport_depart2} to\n${flights[0].airport_arrive2}\nFlight Code: ${flights[0].flight_id2}\nAirline: ${flights[0].airline2}\nDepart Date: ${flights[0].depart_day2.value}\nDepart Time: ${flights[0].depart_time2.value}\nArrive Date: ${flights[0].arrive_day2.value}\nArrive Time: ${flights[0].arrive_time2.value}\n\nPrice: ${flights[0].price}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 2: ${flights[1].flight_id} and ${flights[1].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[1].airport_depart1} to\n${flights[1].airport_arrive1}\nFlight Code: ${flights[1].flight_id}\nAirline: ${flights[1].airline1}\nDepart Date: ${flights[1].depart_day1.value}\nDepart Time: ${flights[1].depart_time1.value}\nArrive Date: ${flights[1].arrive_day1.value}\nArrive Time: ${flights[1].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[1].airport_depart2} to\n${flights[1].airport_arrive2}\nFlight Code: ${flights[1].flight_id2}\nAirline: ${flights[1].airline2}\nDepart Date: ${flights[1].depart_day2.value}\nDepart Time: ${flights[1].depart_time2.value}\nArrive Date: ${flights[1].arrive_day2.value}\nArrive Time: ${flights[1].arrive_time2.value}\n\nPrice: ${flights[1].price}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 3: ${flights[2].flight_id} and ${flights[2].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[2].airport_depart1} to\n${flights[2].airport_arrive1}\nFlight Code: ${flights[2].flight_id}\nAirline: ${flights[2].airline1}\nDepart Date: ${flights[2].depart_day1.value}\nDepart Time: ${flights[2].depart_time1.value}\nArrive Date: ${flights[2].arrive_day1.value}\nArrive Time: ${flights[2].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[2].airport_depart2} to\n${flights[2].airport_arrive2}\nFlight Code: ${flights[2].flight_id2}\nAirline: ${flights[2].airline2}\nDepart Date: ${flights[2].depart_day2.value}\nDepart Time: ${flights[2].depart_time2.value}\nArrive Date: ${flights[2].arrive_day2.value}\nArrive Time: ${flights[2].arrive_time2.value}\n\nPrice: ${flights[2].price}`,
                  },
                  {
                    "type": "divider"
                  },
                  {    
                    "type": "list",
                    "title": `Option 4: ${flights[3].flight_id} and ${flights[3].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[3].airport_depart1} to\n${flights[3].airport_arrive1}\nFlight Code: ${flights[3].flight_id}\nAirline: ${flights[3].airline1}\nDepart Date: ${flights[3].depart_day1.value}\nDepart Time: ${flights[3].depart_time1.value}\nArrive Date: ${flights[3].arrive_day1.value}\nArrive Time: ${flights[3].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[3].airport_depart2} to\n${flights[3].airport_arrive2}\nFlight Code: ${flights[3].flight_id2}\nAirline: ${flights[3].airline2}\nDepart Date: ${flights[3].depart_day2.value}\nDepart Time: ${flights[3].depart_time2.value}\nArrive Date: ${flights[3].arrive_day2.value}\nArrive Time: ${flights[3].arrive_time2.value}\n\nPrice: ${flights[3].price}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 5: ${flights[4].flight_id} and ${flights[4].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[4].airport_depart1} to\n${flights[4].airport_arrive1}\nFlight Code: ${flights[4].flight_id}\nAirline: ${flights[4].airline1}\nDepart Date: ${flights[4].depart_day1.value}\nDepart Time: ${flights[4].depart_time1.value}\nArrive Date: ${flights[4].arrive_day1.value}\nArrive Time: ${flights[4].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[4].airport_depart2} to\n${flights[4].airport_arrive2}\nFlight Code: ${flights[4].flight_id2}\nAirline: ${flights[4].airline2}\nDepart Date: ${flights[4].depart_day2.value}\nDepart Time: ${flights[4].depart_time2.value}\nArrive Date: ${flights[4].arrive_day2.value}\nArrive Time: ${flights[4].arrive_time2.value}\n\nPrice: ${flights[4].price}`,
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `Option 6: ${flights[5].flight_id} and ${flights[5].flight_id2}`,
                    "subtitle": `Departure Flight\nFlight Route: ${flights[5].airport_depart1} to\n${flights[5].airport_arrive1}\nFlight Code: ${flights[5].flight_id}\nAirline: ${flights[5].airline1}\nDepart Date: ${flights[5].depart_day1.value}\nDepart Time: ${flights[5].depart_time1.value}\nArrive Date: ${flights[5].arrive_day1.value}\nArrive Time: ${flights[5].arrive_time1.value}\n\nReturn Flight\nFlight Route: ${flights[5].airport_depart2} to\n${flights[5].airport_arrive2}\nFlight Code: ${flights[5].flight_id2}\nAirline: ${flights[5].airline2}\nDepart Date: ${flights[5].depart_day2.value}\nDepart Time: ${flights[5].depart_time2.value}\nArrive Date: ${flights[5].arrive_day2.value}\nArrive Time: ${flights[5].arrive_time2.value}\n\nPrice: ${flights[5].price}`,
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
              "optionA": flights[0],
              "optionB": flights[1],
              "optionC": flights[2],
              "optionD": flights[3],
              "optionE": flights[4],
              "optionF": flights[5],
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
              "flightcode": info.flight_id,
              "flightairline": info.airline,
              "flightdepartday": info.depart_day,
              "flightdeparttime": info.depart_time.value,
              "flightarriveday": info.arrive_day,
              "flightarrivetime": info.arrive_time.value,
              "amount": info.price
          }
        }
    }
    res.status(200).send(jsonResponse);         
  }

    async function setOptionParamRound() {
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
              "flightcode1": info.flight_id,
              "flightcode2": info.flight_id2,
              "flightairline1": info.airline1,
              "flightairline2": info.airline2,
              "flightdepartday1": info.depart_day1,
              "flightdeparttime1": info.depart_time1,
              "flightarriveday1": info.arrive_day1,
              "flightarrivetime1": info.arrive_time1,
              "flightdepartday2": info.depart_day2,
              "flightdeparttime2": info.depart_time2,
              "flightarriveday2": info.arrive_day2,
              "flightarrivetime2": info.arrive_time2,
              "amount": info.price
          }
        }
    }
    res.status(200).send(jsonResponse);         
  }

  async function saveTransaction() {
    const bigqueryClient = new BigQuery();
    let flight_type = req.body.sessionInfo.parameters.flighttype
    let amount_raw = req.body.sessionInfo.parameters.amount
    let seat = req.body.sessionInfo.parameters.flightseatno
    let amount_final = seat * amount_raw
    let flight_id
    if (flight_type === 'round')
      flight_id = req.body.sessionInfo.parameters.flightcode1
    else
      flight_id = req.body.sessionInfo.parameters.flightcode
    let sql = `INSERT INTO \`RBHmockupDB.Transaction_Records\`
      VALUES ('1','book_flight',@amount,@flight_id)`;
    const options = {
      query: sql,
      params: {amount: amount_final.toString(), flight_id: flight_id}
    };
    const [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  if (tag==='getFlightsOptionOneWay') {
    queryFlightsOptionOneWay();
  }
  if (tag==='getFlightsOptionRound') {
    queryFlightsOptionRound();
  }
  if (tag==='setOptionParam') {
    setOptionParam();
  }
  if (tag==='setOptionParamRound') {
    setOptionParamRound();
  }
  if (tag==='saveTransaction') {
    saveTransaction();
  }

  async function testSQL() {
    const bigqueryClient = new BigQuery();
    let sql = `SELECT * 
        FROM \`RBHmockupDB.Event_Recorder\`
        ORDER BY time_start`;
    const options = {
        query: sql,
      };
    const [events] = await bigqueryClient.query(options)
    events.forEach(event => {
      });
    res.status(200).send('END TEST SQL');   
  }

  if (tag==='testSQL') {
    testSQL()
  }
};
