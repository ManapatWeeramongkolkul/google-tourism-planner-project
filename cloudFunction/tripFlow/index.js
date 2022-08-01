/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const { BigQuery } = require('@google-cloud/bigquery');
  const axios = require('axios');
  const tag = req.body.fulfillmentInfo.tag;
  const moment = require('moment')
  const mapskey = 'AIzaSyCu3Udg6Li2WxMMhohA3DhUH_ZIGVzwDaM';

  async function formatDate(date) {
    const a = date.year
    const b = date.month
    const c = date.day
    return `${a}-${b}-${c}`
  }

  async function formatDateTime(date,time) {
    return `${date} ${time}`
  }

  async function queryFlightsOptionOneWay() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let airport_depart = req.body.sessionInfo.parameters.tripairportstart
    let airport_arrive = req.body.sessionInfo.parameters.tripairportdestination
    let depart_date = req.body.sessionInfo.parameters.tripfirstdate
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
    let airport_depart = req.body.sessionInfo.parameters.tripairportstart
    let airport_arrive = req.body.sessionInfo.parameters.tripairportdestination
    let depart_date = req.body.sessionInfo.parameters.tripfirstdate
    let date_formatted = await formatDate(depart_date)
    let sql = `SELECT flight_id, airport_depart1, airport_arrive1, depart_day1, depart_time1, arrive_day1, arrive_time1, airline1, flight_id2, airport_depart2, airport_arrive1, depart_day2, depart_time2, arrive_day2, arrive_time2, airline2, price
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

  async function setOptionParamOneWay() {
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

  async function saveEventFlights() {
    const bigqueryClient = new BigQuery();
    let flight_type = req.body.sessionInfo.parameters.tripflighttype
    let amount_raw = req.body.sessionInfo.parameters.amount
    let pplno = req.body.sessionInfo.parameters.trippplno
    let amount_final = pplno * amount_raw
    if (flight_type === 'round') {
      // Go trip
      amount_final = amount_final / 2
      let depart_date = req.body.sessionInfo.parameters.flightdepartday1.value
      let depart_time = req.body.sessionInfo.parameters.flightdeparttime1.value
      let depart_datetime = await formatDateTime(depart_date, depart_time)
      let arrive_date = req.body.sessionInfo.parameters.flightarriveday1.value
      let arrive_time = req.body.sessionInfo.parameters.flightarrivetime1.value
      let arrive_datetime = await formatDateTime(arrive_date, arrive_time)
      let tripairportstart = req.body.sessionInfo.parameters.tripairportstart
      let tripairportdestination = req.body.sessionInfo.parameters.tripairportdestination
      let description = 'Flight from ' + tripairportstart + ' to ' + tripairportdestination
      let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','flight', @depart_datetime , @arrive_datetime ,@amount_final, @tripairportstart, @tripairportdestination, @description)`;
      let options = {
        query: sql,
        params: { depart_datetime: depart_datetime, arrive_datetime: arrive_datetime, amount_final: amount_final.toString(),tripairportstart: tripairportstart, tripairportdestination: tripairportdestination, description: description }
      };
      let [placeholder] = await bigqueryClient.query(options)
      // Return trip
      depart_date = req.body.sessionInfo.parameters.flightdepartday2.value
      depart_time = req.body.sessionInfo.parameters.flightdeparttime2.value
      depart_datetime = await formatDateTime(depart_date, depart_time)
      arrive_date = req.body.sessionInfo.parameters.flightarriveday2.value
      arrive_time = req.body.sessionInfo.parameters.flightarrivetime2.value
      arrive_datetime = await formatDateTime(arrive_date, arrive_time)
      tripairportstart = req.body.sessionInfo.parameters.tripairportdestination
      tripairportdestination = req.body.sessionInfo.parameters.tripairportstart
      description = 'Flight from ' + tripairportstart + ' to ' + tripairportdestination
      sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','flight', @depart_datetime, @arrive_datetime, @amount_final, @tripairportstart, @tripairportdestination, @description)`;
      options = {
        query: sql,
        params: { depart_datetime: depart_datetime, arrive_datetime: arrive_datetime, amount_final: amount_final.toString(), tripairportstart: tripairportstart, tripairportdestination: tripairportdestination, description: description }
      };
      [placeholder] = await bigqueryClient.query(options)      
    } else {
      let depart_date = req.body.sessionInfo.parameters.flightdepartday.value
      let depart_time = req.body.sessionInfo.parameters.flightdeparttime
      let depart_datetime = await formatDateTime(depart_date, depart_time)
      let arrive_date = req.body.sessionInfo.parameters.flightarriveday.value
      let arrive_time = req.body.sessionInfo.parameters.flightarrivetime
      let arrive_datetime = await formatDateTime(arrive_date, arrive_time)
      let tripairportstart = req.body.sessionInfo.parameters.tripairportstart
      let tripairportdestination = req.body.sessionInfo.parameters.tripairportdestination
      let description = 'Flight from ' + tripairportstart + ' to ' + tripairportdestination
      let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','flight', @depart_datetime , @arrive_datetime ,@amount_final, @tripairportstart, @tripairportdestination, @description)`;
      let options = {
        query: sql,
        params: { depart_datetime: depart_datetime, arrive_datetime: arrive_datetime, amount_final: amount_final.toString(),tripairportstart: tripairportstart, tripairportdestination: tripairportdestination, description: description }
      };
      let [placeholder] = await bigqueryClient.query(options)
    }
    saveTransaction()
    res.status(200).send()
  }

  async function saveTransaction() {
    const bigqueryClient = new BigQuery();
    let flight_type = req.body.sessionInfo.parameters.tripflighttype
    let amount_raw = req.body.sessionInfo.parameters.amount
    let seat = req.body.sessionInfo.parameters.trippplno
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

  async function calculateNetAmount() {
    let session_name = req.body.sessionInfo.session
    let amount = req.body.sessionInfo.parameters.amount
    let no = req.body.sessionInfo.parameters.trippplno
    let budget = req.body.sessionInfo.parameters.tripbudget.amount
    let netleft = budget - (amount * no)
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function calculateNetAmount2() {
    let session_name = req.body.sessionInfo.session
    let amount = req.body.sessionInfo.parameters.amount
    let no = req.body.sessionInfo.parameters.trippplno
    let netleft = req.body.sessionInfo.parameters.netleft
    netleft = netleft - (amount * no)
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft
          }
        }
    }
    res.status(200).send(jsonResponse);      
  }

  async function getHotelInformation() {
    let session_name = req.body.sessionInfo.session
    const bigqueryClient = new BigQuery();
    const prevlocation = req.body.sessionInfo.parameters.triplatestlocation
    const newlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Get place_id (Places API)
    let url_searchplaceid1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ prevlocation.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info1 = await axios.get(url_searchplaceid1)
    let place_id1 = place_info1.data.results[0].place_id
    
    let url_searchplaceid2 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ newlocation.split(' ').join('+') + '+Hotel+Bangkok&key=' + mapskey;
    let place_info2 = await axios.get(url_searchplaceid2)
    let place_id2 = place_info2.data.results[0].place_id  

    // Distances Matrix API
    let url_getdistance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${place_id1}&destinations=place_id:${place_id2}&key=` + mapskey; 
    let distance_info = await axios.get(url_getdistance)
    let distance = distance_info.data.rows[0].elements[0].distance.text
    let duration = distance_info.data.rows[0].elements[0].duration.text

    // Places API
    let url_description = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id2}&key=` + mapskey;
    let description = await axios.get(url_description)
    let data = description.data
    let formatted_address = formatted_phone_number = international_phone_number = opening_hours = price_level = rating = user_ratings_total = url = website = 'N/A'
    if (data.result.formatted_address)
      formatted_address = data.result.formatted_address
    if (data.result.formatted_phone_number)
      formatted_phone_number = data.result.formatted_phone_number
    if (data.result.international_phone_number)
      international_phone_number = data.result.international_phone_number
    if (data.result.opening_hours.weekday_text)
      opening_hours = data.result.opening_hours.weekday_text
    if (data.result.price_level)
      price_level = data.result.price_level
    if (data.result.rating) {
      rating = data.result.rating
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.user_ratings_total) {
      user_ratings_total = data.result.user_ratings_total
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.url)
      url = data.result.url
    if (data.result.website)
      website = data.result.website

    // Query cost
    let sql = `SELECT hotel_id, hotel_name, hotel_city, price
    FROM \`RBHmockupDB.Hotels\`
    WHERE hotel_name = @hotel_name`;
    let options = {
      query: sql,
      params: {hotel_name : newlocation}
    };
    const [hotel] = await bigqueryClient.query(options)
    const amount = hotel[0].price
    const hotel_id = hotel[0].hotel_id
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "amount": amount,
              "hotelid": hotel_id,
              "apidistance": distance,
              "apitimetotravel": duration,
              "apiformattedaddress": formatted_address,
              "apiformattedphonenumber": formatted_phone_number,
              "apiinternationalphonenumber": international_phone_number,
              "apiopeninghours": opening_hours,
              "apipricelevel": price_level,
              "apirating": rating,
              "apiuserratingtotal":user_ratings_total,
              "apiurl": url,
              "apiwebsite": website      
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function getEatInformation() {
    let session_name = req.body.sessionInfo.session
    const bigqueryClient = new BigQuery();
    const prevlocation = req.body.sessionInfo.parameters.triplatestlocation
    const newlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Get place_id (Places API)
    let url_searchplaceid1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ prevlocation.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info1 = await axios.get(url_searchplaceid1)
    let place_id1 = place_info1.data.results[0].place_id
    
    let url_searchplaceid2 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ newlocation.split(' ').join('+') + '+Restaurant+Bangkok&key=' + mapskey;
    let place_info2 = await axios.get(url_searchplaceid2)
    let place_id2 = place_info2.data.results[0].place_id  

    // Distances Matrix API
    let url_getdistance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${place_id1}&destinations=place_id:${place_id2}&key=` + mapskey; 
    let distance_info = await axios.get(url_getdistance)
    let distance = distance_info.data.rows[0].elements[0].distance.text
    let duration = distance_info.data.rows[0].elements[0].duration.text

    // Places API
    let url_description = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id2}&key=` + mapskey;
    let description = await axios.get(url_description)
    let data = description.data
    let formatted_address = formatted_phone_number = international_phone_number = opening_hours = price_level = rating = user_ratings_total = url = website = 'N/A'
    if (data.result.formatted_address)
      formatted_address = data.result.formatted_address
    if (data.result.formatted_phone_number)
      formatted_phone_number = data.result.formatted_phone_number
    if (data.result.international_phone_number)
      international_phone_number = data.result.international_phone_number
    if (data.result.opening_hours.weekday_text)
      opening_hours = data.result.opening_hours.weekday_text
    if (data.result.price_level)
      price_level = data.result.price_level
    if (data.result.rating) {
      rating = data.result.rating
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.user_ratings_total) {
      user_ratings_total = data.result.user_ratings_total
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.url)
      url = data.result.url
    if (data.result.website)
      website = data.result.website

    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "apidistance": distance,
              "apitimetotravel": duration,
              "apiformattedaddress": formatted_address,
              "apiformattedphonenumber": formatted_phone_number,
              "apiinternationalphonenumber": international_phone_number,
              "apiopeninghours": opening_hours,
              "apipricelevel": price_level,
              "apirating": rating,
              "apiuserratingtotal":user_ratings_total,
              "apiurl": url,
              "apiwebsite": website     
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function getShopInformation() {
    let session_name = req.body.sessionInfo.session
    const bigqueryClient = new BigQuery();
    const prevlocation = req.body.sessionInfo.parameters.triplatestlocation
    const newlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Get place_id (Places API)
    let url_searchplaceid1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ prevlocation.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info1 = await axios.get(url_searchplaceid1)
    let place_id1 = place_info1.data.results[0].place_id
    
    let url_searchplaceid2 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ newlocation.split(' ').join('+') + '+Mall+Bangkok&key=' + mapskey;
    let place_info2 = await axios.get(url_searchplaceid2)
    let place_id2 = place_info2.data.results[0].place_id  

    // Distances Matrix API
    let url_getdistance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${place_id1}&destinations=place_id:${place_id2}&key=` + mapskey; 
    let distance_info = await axios.get(url_getdistance)
    let distance = distance_info.data.rows[0].elements[0].distance.text
    let duration = distance_info.data.rows[0].elements[0].duration.text

    // Places API
    let url_description = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id2}&key=` + mapskey;
    let description = await axios.get(url_description)
    let data = description.data
    let formatted_address = formatted_phone_number = international_phone_number = opening_hours = price_level = rating = user_ratings_total = url = website = 'N/A'
    if (data.result.formatted_address)
      formatted_address = data.result.formatted_address
    if (data.result.formatted_phone_number)
      formatted_phone_number = data.result.formatted_phone_number
    if (data.result.international_phone_number)
      international_phone_number = data.result.international_phone_number
    if (data.result.opening_hours.weekday_text)
      opening_hours = data.result.opening_hours.weekday_text
    if (data.result.price_level)
      price_level = data.result.price_level
    if (data.result.rating) {
      rating = data.result.rating
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.user_ratings_total) {
      user_ratings_total = data.result.user_ratings_total
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.url)
      url = data.result.url
    if (data.result.website)
      website = data.result.website
      
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "apidistance": distance,
              "apitimetotravel": duration,
              "apiformattedaddress": formatted_address,
              "apiformattedphonenumber": formatted_phone_number,
              "apiinternationalphonenumber": international_phone_number,
              "apiopeninghours": opening_hours,
              "apipricelevel": price_level,
              "apirating": rating,
              "apiuserratingtotal":user_ratings_total,
              "apiurl": url,
              "apiwebsite": website     
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function getTravelInformation() {
    let session_name = req.body.sessionInfo.session
    const bigqueryClient = new BigQuery();
    const prevlocation = req.body.sessionInfo.parameters.triplatestlocation
    const newlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Get place_id (Places API)
    let url_searchplaceid1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ prevlocation.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info1 = await axios.get(url_searchplaceid1)
    let place_id1 = place_info1.data.results[0].place_id
    
    let url_searchplaceid2 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ newlocation.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info2 = await axios.get(url_searchplaceid2)
    let place_id2 = place_info2.data.results[0].place_id  

    // Distances Matrix API
    let url_getdistance = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${place_id1}&destinations=place_id:${place_id2}&key=` + mapskey; 
    let distance_info = await axios.get(url_getdistance)
    let distance = distance_info.data.rows[0].elements[0].distance.text
    let duration = distance_info.data.rows[0].elements[0].duration.text

    // Places API
    let url_description = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id2}&key=` + mapskey;
    let description = await axios.get(url_description)
    let data = description.data
    let formatted_address = formatted_phone_number = international_phone_number = opening_hours = price_level = rating = user_ratings_total = url = website = 'N/A'
    formatted_address = data.result.formatted_address
    if (data.result.formatted_phone_number)
      formatted_phone_number = data.result.formatted_phone_number
    if (data.result.international_phone_number)
      international_phone_number = data.result.international_phone_number
    if (data.result.opening_hours.weekday_text)
      opening_hours = data.result.opening_hours.weekday_text
    if (data.result.price_level)
      price_level = data.result.price_level
    if (data.result.rating) {
      rating = data.result.rating
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.user_ratings_total) {
      user_ratings_total = data.result.user_ratings_total
    } else if (place_id2.data.result[0].rating) {
      rating = place_id2.data.result[0].rating
    }
    if (data.result.url)
      url = data.result.url
    if (data.result.website)
      website = data.result.website

    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "apidistance": distance,
              "apitimetotravel": duration,
              "apiformattedaddress": formatted_address,
              "apiformattedphonenumber": formatted_phone_number,
              "apiinternationalphonenumber": international_phone_number,
              "apiopeninghours": opening_hours,
              "apipricelevel": price_level,
              "apirating": rating,
              "apiuserratingtotal":user_ratings_total,
              "apiurl": url,
              "apiwebsite": website     
          }
        }
    }
    res.status(200).send(jsonResponse);
  }

  async function updateParamHotel() {
    let session_name = req.body.sessionInfo.session
    let pplno = req.body.sessionInfo.parameters.trippplno
    let roomno = Math.ceil(pplno/2)
    let amount = req.body.sessionInfo.parameters.amount
    let netamount = amount * roomno
    let left = req.body.sessionInfo.parameters.netleft
    let netleft = left - netamount
    // Update tripdatetime
    let datetime = new Date(req.body.sessionInfo.parameters.tripdatetime);

    let newtimespent = req.body.sessionInfo.parameters.triptimespent
    let dur_amount = newtimespent.amount
    let dur_unit = newtimespent.unit
    if (dur_unit === 'min')
      dur_unit = 'm'
    if (dur_unit === 'day')
      dur_unit = 'd'

    // Include time to travel here
    let timetotravel = req.body.sessionInfo.parameters.apitimetotravel
    let travel_split = timetotravel.trim().split(/\s+/);
    let travel_amount = travel_split[0]
    let travel_unit = travel_split[1]
    if (travel_unit === 'min' || travel_unit === 'mins')
      travel_unit = 'm'
    if (travel_unit === 'day' || travel_unit === 'days')
      travel_unit = 'd'
    let includetraveltime = moment(datetime).add(travel_amount, travel_unit).format("YYYY-MM-DD HH:mm:ss") // HARD CODE
    netleft = netleft - 150

    let newdatetime = moment(includetraveltime).add(dur_amount, dur_unit).format("YYYY-MM-DD HH:mm:ss")
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft,
              "olddatetime": datetime,
              "includetraveltime":includetraveltime,
              "tripdatetime": newdatetime
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function updateParamEat() {
    let session_name = req.body.sessionInfo.session
    let netamount = req.body.sessionInfo.parameters.amount
    let left = req.body.sessionInfo.parameters.netleft
    let netleft = left - netamount.amount
    // Update tripdatetime
    let datetime = new Date(req.body.sessionInfo.parameters.tripdatetime);

    let newtimespent = req.body.sessionInfo.parameters.triptimespent
    let dur_amount = newtimespent.amount
    let dur_unit = newtimespent.unit
    if (dur_unit === 'min')
      dur_unit = 'm'
    if (dur_unit === 'day')
      dur_unit = 'd'

    // Include time to travel here
    let timetotravel = req.body.sessionInfo.parameters.apitimetotravel
    let travel_split = timetotravel.trim().split(/\s+/);
    let travel_amount = travel_split[0]
    let travel_unit = travel_split[1]
    if (travel_unit === 'min' || travel_unit === 'mins')
      travel_unit = 'm'
    if (travel_unit === 'day' || travel_unit === 'days')
      travel_unit = 'd'
    let includetraveltime = moment(datetime).add(travel_amount, travel_unit).format("YYYY-MM-DD HH:mm:ss") // HARD CODE
    netleft = netleft - 150

    let newdatetime = moment(includetraveltime).add(dur_amount, dur_unit).format("YYYY-MM-DD HH:mm:ss")
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft,
              "olddatetime": datetime,
              "includetraveltime":includetraveltime,
              "tripdatetime": newdatetime
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function updateParamShop() {
    let session_name = req.body.sessionInfo.session
    let netamount = req.body.sessionInfo.parameters.amount
    let left = req.body.sessionInfo.parameters.netleft
    let netleft = left - netamount.amount
    // Update tripdatetime
    let datetime = new Date(req.body.sessionInfo.parameters.tripdatetime);

    let newtimespent = req.body.sessionInfo.parameters.triptimespent
    let dur_amount = newtimespent.amount
    let dur_unit = newtimespent.unit
    if (dur_unit === 'min')
      dur_unit = 'm'
    if (dur_unit === 'day')
      dur_unit = 'd'

    // Include time to travel here
    let timetotravel = req.body.sessionInfo.parameters.apitimetotravel
    let travel_split = timetotravel.trim().split(/\s+/);
    let travel_amount = travel_split[0]
    let travel_unit = travel_split[1]
    if (travel_unit === 'min' || travel_unit === 'mins')
      travel_unit = 'm'
    if (travel_unit === 'day' || travel_unit === 'days')
      travel_unit = 'd'
    let includetraveltime = moment(datetime).add(travel_amount, travel_unit).format("YYYY-MM-DD HH:mm:ss") // HARD CODE
    netleft = netleft - 150

    let newdatetime = moment(includetraveltime).add(dur_amount, dur_unit).format("YYYY-MM-DD HH:mm:ss")
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft,
              "olddatetime": datetime,
              "includetraveltime":includetraveltime,
              "tripdatetime": newdatetime
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function updateParamTravel() {
    let session_name = req.body.sessionInfo.session
    let netamount = req.body.sessionInfo.parameters.amount
    let left = req.body.sessionInfo.parameters.netleft
    let netleft = left - netamount.amount
    // Update tripdatetime
    let datetime = new Date(req.body.sessionInfo.parameters.tripdatetime);

    let newtimespent = req.body.sessionInfo.parameters.triptimespent
    let dur_amount = newtimespent.amount
    let dur_unit = newtimespent.unit
    if (dur_unit === 'min')
      dur_unit = 'm'
    if (dur_unit === 'day')
      dur_unit = 'd'
        
    // Include time to travel here
    let timetotravel = req.body.sessionInfo.parameters.apitimetotravel
    let travel_split = timetotravel.trim().split(/\s+/);
    let travel_amount = travel_split[0]
    let travel_unit = travel_split[1]
    if (travel_unit === 'min' || travel_unit === 'mins')
      travel_unit = 'm'
    if (travel_unit === 'day' || travel_unit === 'days')
      travel_unit = 'd'
    let includetraveltime = moment(datetime).add(travel_amount, travel_unit).format("YYYY-MM-DD HH:mm:ss") // HARD CODE
    netleft = netleft - 150

    let newdatetime = moment(includetraveltime).add(dur_amount, dur_unit).format("YYYY-MM-DD HH:mm:ss")
    let jsonResponse = {
      "session_info": {
          "session": session_name,
          "parameters": {
              "netleft": netleft,
              "olddatetime": datetime,
              "includetraveltime":includetraveltime,
              "tripdatetime": newdatetime
          }
        }
    }
    res.status(200).send(jsonResponse);  
  }

  async function saveEventHotels() {
    const bigqueryClient = new BigQuery();
    const pplno = req.body.sessionInfo.parameters.trippplno
    const roomno = Math.ceil(pplno/2)
    const amount = req.body.sessionInfo.parameters.amount
    const netamount = amount * roomno
    const includetraveltime = req.body.sessionInfo.parameters.includetraveltime
    const newdatetime = req.body.sessionInfo.parameters.tripdatetime
    const triplatestlocation = req.body.sessionInfo.parameters.triplatestlocation
    const tripnextlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Stay
    let description = 'Stay at ' + tripnextlocation
    let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','hotel', @includetraveltime , @newdatetime ,@netamount, @triplatestlocation, @tripnextlocation, @description)`;
    let options = {
      query: sql,
      params: { includetraveltime: includetraveltime, newdatetime: newdatetime, netamount: netamount.toString(),triplatestlocation: triplatestlocation, tripnextlocation: tripnextlocation, description: description }
    };
    let [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  async function saveHotelTransaction() {
    const bigqueryClient = new BigQuery();
    let amount_raw = req.body.sessionInfo.parameters.amount
    let pplno = req.body.sessionInfo.parameters.trippplno
    let roomno = Math.ceil(pplno/2)
    let amount_final = roomno * amount_raw
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

  async function saveEventTravel() { // Price HARD CODED
    const bigqueryClient = new BigQuery();
    const triplatestlocation = req.body.sessionInfo.parameters.triplatestlocation
    const tripnextlocation = req.body.sessionInfo.parameters.tripnextlocation
    const olddatetime = req.body.sessionInfo.parameters.olddatetime
    const formattedold = moment(olddatetime).format("YYYY-MM-DD HH:mm:ss")
    const includetraveltime = req.body.sessionInfo.parameters.includetraveltime
    let description = 'Travel from ' + triplatestlocation + ' to ' + tripnextlocation

    let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','travel', @olddatetime , @includetraveltime ,@netamount, @triplatestlocation, @tripnextlocation, @description)`;
    let options = {
      query: sql,
      params: { olddatetime: formattedold, includetraveltime: includetraveltime, netamount: '150',triplatestlocation: triplatestlocation, tripnextlocation: tripnextlocation, description: description }
    };
    let [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }
  
  async function saveEventEat() {
    const bigqueryClient = new BigQuery();
    const netamount = req.body.sessionInfo.parameters.amount.amount
    const includetraveltime = req.body.sessionInfo.parameters.includetraveltime
    const newdatetime = req.body.sessionInfo.parameters.tripdatetime
    const triplatestlocation = req.body.sessionInfo.parameters.triplatestlocation
    const tripnextlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Stay
    let description = 'Eat at ' + tripnextlocation
    let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','restaurant', @includetraveltime , @newdatetime ,@netamount, @triplatestlocation, @tripnextlocation, @description)`;
    let options = {
      query: sql,
      params: { includetraveltime: includetraveltime, newdatetime: newdatetime, netamount: netamount.toString(),triplatestlocation: triplatestlocation, tripnextlocation: tripnextlocation, description: description }
    };
    let [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  async function saveEventShop() {
    const bigqueryClient = new BigQuery();
    const netamount = req.body.sessionInfo.parameters.amount.amount
    const includetraveltime = req.body.sessionInfo.parameters.includetraveltime
    const newdatetime = req.body.sessionInfo.parameters.tripdatetime
    const triplatestlocation = req.body.sessionInfo.parameters.triplatestlocation
    const tripnextlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Stay
    let description = 'Shop at ' + tripnextlocation
    let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','shop', @includetraveltime , @newdatetime ,@netamount, @triplatestlocation, @tripnextlocation, @description)`;
    let options = {
      query: sql,
      params: { includetraveltime: includetraveltime, newdatetime: newdatetime, netamount: netamount.toString(),triplatestlocation: triplatestlocation, tripnextlocation: tripnextlocation, description: description }
    };
    let [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  async function saveEventTravelTo() {
    const bigqueryClient = new BigQuery();
    const netamount = req.body.sessionInfo.parameters.amount.amount
    const includetraveltime = req.body.sessionInfo.parameters.includetraveltime
    const newdatetime = req.body.sessionInfo.parameters.tripdatetime
    const triplatestlocation = req.body.sessionInfo.parameters.tripnextlocation
    const tripnextlocation = req.body.sessionInfo.parameters.tripnextlocation

    // Stay
    let description = 'Stay at ' + tripnextlocation
    let sql = `INSERT INTO \`RBHmockupDB.Event_Recorder\`
      VALUES ('1','visit', @includetraveltime , @newdatetime ,@netamount, @triplatestlocation, @tripnextlocation, @description)`;
    let options = {
      query: sql,
      params: { includetraveltime: includetraveltime, newdatetime: newdatetime, netamount: netamount.toString(),triplatestlocation: triplatestlocation, tripnextlocation: tripnextlocation, description: description }
    };
    let [placeholder] = await bigqueryClient.query(options)
    res.status(200).send()
  }

  if (tag==='getFlightsOptionOneWay') {
    queryFlightsOptionOneWay();
  }
  if (tag==='getFlightsOptionRound') {
    queryFlightsOptionRound();
  }
  if (tag==='setOptionParamOneWay') {
    setOptionParamOneWay();
  }
  if (tag==='setOptionParamRound') {
    setOptionParamRound();
  }
  if (tag==='saveEventFlights') {
    saveEventFlights();
  }
  if (tag==='calculateNetAmount') {
    calculateNetAmount();
  }
  if (tag==='calculateNetAmount2') {
    calculateNetAmount2();
  }
  if (tag==='getHotelInformation') {
    getHotelInformation();
  }
  if (tag==='getEatInformation') {
    getEatInformation();
  }
  if (tag==='getShopInformation') {
    getShopInformation();
  }
  if (tag==='getTravelInformation') {
    getTravelInformation();
  }
  if (tag==='updateParamHotel') {
    updateParamHotel();
  }
  if (tag==='updateParamEat') {
    updateParamEat()
  }
  if (tag==='updateParamShop') {
    updateParamShop()
  }
  if (tag==='updateParamTravel') {
    updateParamTravel()
  }
  if (tag==='saveEventHotels') {
    saveEventHotels();
  }
  if (tag==='saveHotelTransaction') {
    saveHotelTransaction();
  }
  if (tag==='saveEventTravel') {
    saveEventTravel();
  }
  if (tag==='saveEventEat') {
    saveEventEat();
  }
  if (tag==='saveEventShop') {
    saveEventShop();
  }
  if (tag==='saveEventTravelTo') {
    saveEventTravelTo();
  }
};
