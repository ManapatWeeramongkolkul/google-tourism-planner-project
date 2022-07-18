/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const { BigQuery } = require('@google-cloud/bigquery');
  const tag = req.body.fulfillmentInfo.tag;
  const mapskey = 'AIzaSyCu3Udg6Li2WxMMhohA3DhUH_ZIGVzwDaM';

  async function searchContentName(idNumber) {
    const bigqueryClient = new BigQuery();
    if (1 <= idNumber && idNumber <= 50) {
        let sql = `SELECT hotel_id AS contentId, hotel_name AS contentName
              FROM \`RBHmockupDB.Hotels\`
              WHERE hotel_id IN (@id)`
        let options = {
          query: sql,
          params: {id: idNumber.toString()} 
        }
        let [data] = await bigqueryClient.query(options)
        return {
          "contentName": data[0].contentName,
          "contentCategory": "Category: Hotel"
        }
    } else if (1000 <= idNumber && idNumber <= 1029) {
        let sql = `SELECT tour_id AS contentId, tour_name AS contentName
              FROM \`RBHmockupDB.Travel_Tour\`
              WHERE tour_id IN (@id)`
        let options = {
          query: sql,
          params: {id: idNumber.toString()} 
        }
        let [data] = await bigqueryClient.query(options)
        return {
          "contentName": data[0].contentName,
          "contentCategory": "Category: Tour"
        }
    } else if (100 <= idNumber && idNumber <= 219) {
        let sql = `SELECT item_id AS contentId, flight_id AS contentName
              FROM \`RBHmockupDB.Flights_OneWayAll\`
              WHERE item_id IN (@id)`
        let options = {
          query: sql,
          params: {id: idNumber.toString()} 
        }
        let [data] = await bigqueryClient.query(options)
        return {
          "contentName": data[0].contentName,
          "contentCategory": "Category: One-Way Flight"
        }
    } else if (300 <= idNumber && idNumber <= 399) {
        let sql = `SELECT item_id AS contentId, flight_id AS contentName
              FROM \`RBHmockupDB.Flights_RoundAll\`
              WHERE item_id IN (@id)`
        let options = {
          query: sql,
          params: {id: idNumber.toString()} 
        }
        let [data] = await bigqueryClient.query(options)
        return {
          "contentName": data[0].contentName,
          "contentCategory": "Category: Round Trip Flight"
        }
    } else if (2000 <= idNumber && idNumber <= 2050) {
        let sql = `SELECT location_id AS contentId, location_name AS contentName
              FROM \`RBHmockupDB.Travel_Location\`
              WHERE location_id IN (@id)`
        let options = {
          query: sql,
          params: {id: idNumber.toString()} 
        }
        let [data] = await bigqueryClient.query(options)
        return {
          "contentName": data[0].contentName,
          "contentCategory": "Category: Location"
        }
    } else {
      return {
          "contentName": "No Recommendation",
          "contentCategory": "No Matching Category"
        }
    }
  }

  async function recommendGeneral() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let visitorId = 1
    let sql
    sql =  `SELECT contentId
            FROM \`RBHmockupDB.Recommendation_Content\`
            WHERE visitorId = @visitorId
            ORDER BY predicted_rating_confidence DESC
            LIMIT 5`
    let options = {
      query: sql,
      params: {visitorId: visitorId} 
    }
    let [id] = await bigqueryClient.query(options)
    let generalRecs = [];
    for (let i = 0; i < 5; i++) {
      let idNumber = id[i].contentId
      recs = await searchContentName(idNumber);
      generalRecs.push(recs)
    }
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "image",
                    "rawUrl": "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-robot-gives-recommendation-human-get-automated-response-chatbot-business-consulting-system-122165563.jpg",
                    "accessibilityText": "Recommendation Bot"
                  },
                  // {
                  //   "type": "info",
                  //   "title": "RecTrip Bot",
                  //   "subtitle": "People Like You Also Chose:",
                  // },
                  {
                    "type": "list",
                    "title": `${generalRecs[0].contentCategory}`,
                    "subtitle": `${generalRecs[0].contentName}`
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${generalRecs[1].contentCategory}`,
                    "subtitle": `${generalRecs[1].contentName}`
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${generalRecs[4].contentCategory}`,
                    "subtitle": "Bangkok Art and Culture Centre" // HARD CODED
                    // "subtitle": `${generalRecs[4].contentName}`
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${generalRecs[3].contentCategory}`,
                    "subtitle": `${generalRecs[3].contentName}`
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${generalRecs[2].contentCategory}`,
                    "subtitle": `${generalRecs[2].contentName}     `
                  }
                ]
              ]
            }
          }
        ]
      },
      // "session_info": {
      //     "session": session_name,
      //     "parameters": {
      //         "optionA": generalRecs[0],
      //         "optionB": generalRecs[1],
      //         "optionC": generalRecs[2],
      //         "optionD": generalRecs[3],
      //         "optionE": generalRecs[4],
      //     }
      //   }
    }
    res.status(200).send(jsonResponse);
  }

  async function recommendTour() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let visitorId = 1
    let sql
    sql =  `SELECT contentId
            FROM \`RBHmockupDB.Recommendation_Content\`
            WHERE visitorId = @visitorId AND contentId <= 1029 AND contentId >= 1000
            ORDER BY predicted_rating_confidence DESC
            LIMIT 3`
    let options = {
      query: sql,
      params: {visitorId: visitorId} 
    }
    let [id] = await bigqueryClient.query(options)
    sql = `SELECT tour_id AS tourId, tour_name AS tourName
           FROM \`RBHmockupDB.Travel_Tour\`
           WHERE tour_id IN (@id0,@id1,@id2)`
    options = {
      query: sql,
      params: {id0: id[0].contentId.toString(), id1: id[1].contentId.toString(), id2: id[2].contentId.toString()} 
    }
    let [toursRec] = await bigqueryClient.query(options)

    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "image",
                    "rawUrl": "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-robot-gives-recommendation-human-get-automated-response-chatbot-business-consulting-system-122165563.jpg",
                    "accessibilityText": "RecTrip Bot"
                  },
                  // {
                  //   "type": "info",
                  //   "title": "RecTrip Bot",
                  //   "subtitle": "Tours Recommended for You!",
                  // },
                  {
                    "type": "button",
                    "icon": {
                      "type": "tour",
                      "color": "#fd73ff"
                    },
                    "text": `${toursRec[0].tourName}`,
                    "link": "https://www.getyourguide.com/bangkok-l169/bangkok-tuk-tuk-tour-by-night-t52629/?partner=true",
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "button",
                    "icon": {
                      "type": "directions_railway",
                      "color": "#fd73ff"
                    },
                    "text": `${toursRec[1].tourName}`,
                    "link": "https://www.tripadvisor.com/AttractionProductReview-g293916-d14105228-Half_Day_Railway_Market_and_Floating_Market_Tour_in_Thailand-Bangkok.html",
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "button",
                    "icon": {
                      "type": "festival",
                      "color": "#fd73ff"
                    },
                    "text": `${toursRec[2].tourName}`,
                    "link": "https://www.tripadvisor.com/AttractionProductReview-g293916-d15126890-Bangkok_to_Angkor_Wat_Tour_3_Days_2_Nights_from_Bangkok-Bangkok.html",
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      // "session_info": {
      //     "session": session_name,
      //     "parameters": {
      //         "optionA": toursRec[0],
      //         "optionB": toursRec[1],
      //         "optionC": toursRec[2],
      //     }
      //   }
    }
    res.status(200).send(jsonResponse);
  }

  async function recommendHotel() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let visitorId = 1
    let sql
    sql =  `SELECT contentId
            FROM \`RBHmockupDB.Recommendation_Content\`
            WHERE visitorId = @visitorId AND contentId <= 50 AND contentId >=1
            ORDER BY predicted_rating_confidence DESC
            LIMIT 3`
    let options = {
      query: sql,
      params: {visitorId: visitorId} 
    }
    let [id] = await bigqueryClient.query(options)
    sql = `SELECT hotel_id AS hotelId, hotel_name AS hotelName, price
           FROM \`RBHmockupDB.Hotels\`
           WHERE hotel_id IN (@id0,@id1,@id2)`
    options = {
      query: sql,
      params: {id0: id[0].contentId.toString(), id1: id[1].contentId.toString(), id2: id[2].contentId.toString()} 
    }
    let [hotelsRec] = await bigqueryClient.query(options)

    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "image",
                    "rawUrl": "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-robot-gives-recommendation-human-get-automated-response-chatbot-business-consulting-system-122165563.jpg",
                    "accessibilityText": "Recommendation Bot"
                  },
                  // {
                  //   "type": "info",
                  //   "title": "RecTrip Bot",
                  //   "subtitle": "Hotels Recommended for You!",
                  // },
                  {
                    "type": "list",
                    "title": `${hotelsRec[0].hotelName}`,
                    "subtitle": `2 Person Room Per Night: ${hotelsRec[0].price} THB`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${hotelsRec[1].hotelName}`,
                    "subtitle": `2 Person Room Per Night: ${hotelsRec[1].price} THB`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${hotelsRec[2].hotelName}`,
                    "subtitle": `2 Person Room Per Night: ${hotelsRec[2].price} THB`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      // "session_info": {
      //     "session": session_name,
      //     "parameters": {
      //         "optionA": hotelsRec[0],
      //         "optionB": hotelsRec[1],
      //         "optionC": hotelsRec[2],
      //     }
      //   }
    }
    res.status(200).send(jsonResponse);
  }

  async function recommendFlight() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let visitorId = 1
    // let flighttype = req.body.sessionInfo.parameters.flighttype
    let sql =  `SELECT contentId
              FROM \`RBHmockupDB.Recommendation_Content\`
              WHERE visitorId = @visitorId AND contentId <= 219 AND contentId >= 100
              ORDER BY predicted_rating_confidence DESC
              LIMIT 3`
    let options = {
        query: sql,
        params: {visitorId: visitorId} 
        }
    let [id] = await bigqueryClient.query(options)
    sql = `SELECT flight_id AS flightId, price, airline
            FROM \`RBHmockupDB.Flights_OneWayAll\`
            WHERE item_id IN (@id0,@id1,@id2)`
    options = {
        query: sql,
        params: {id0: id[0].contentId.toString(), id1: id[1].contentId.toString(), id2: id[2].contentId.toString()} 
    }
    let [flightsRec] = await bigqueryClient.query(options)
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "image",
                    "rawUrl": "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-robot-gives-recommendation-human-get-automated-response-chatbot-business-consulting-system-122165563.jpg",
                    "accessibilityText": "Recommendation Bot"
                  },
                  // {
                  //   "type": "info",
                  //   "title": "RecTrip Bot",
                  //   "subtitle": "Flights Recommended for You!",
                  // },
                  {
                    "type": "list",
                    "title": `${flightsRec[0].flightId}`,
                    "subtitle": `Ticket Price: ${flightsRec[0].price} THB\nAirline: ${flightsRec[0].airline}`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${flightsRec[1].flightId}`,
                    "subtitle": `Ticket Price: ${flightsRec[1].price} THB\nAirline: ${flightsRec[1].airline}`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${flightsRec[2].flightId}`,
                    "subtitle": `Ticket Price: ${flightsRec[2].price} THB\nAirline: ${flightsRec[2].airline}`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      // "session_info": {
      //     "session": session_name,
      //     "parameters": {
      //         "optionA": flightsRec[0],
      //         "optionB": flightsRec[1],
      //         "optionC": flightsRec[2],
      //     }
      //   }
    }
    res.status(200).send(jsonResponse);
  }

  async function findDistance(destination) {
    let prevlocation = req.body.sessionInfo.parameters.triplatestlocation
    let newlocation = destination
    const axios = require('axios');
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
    return [distance, duration]
  }

  async function recommendLocation() {
    const bigqueryClient = new BigQuery();
    let session_name = req.body.sessionInfo.session
    let visitorId = 1
    let sql
    sql =  `SELECT contentId
            FROM \`RBHmockupDB.Recommendation_Content\`
            WHERE visitorId = @visitorId AND contentId <= 2050 AND contentId >= 2000
            ORDER BY predicted_rating_confidence DESC
            LIMIT 3`
    let options = {
      query: sql,
      params: {visitorId: visitorId} 
    }
    let [id] = await bigqueryClient.query(options)
    sql = `SELECT location_id AS locationId, location_name AS locationName
           FROM \`RBHmockupDB.Travel_Location\`
           WHERE location_id IN (@id0,@id1,@id2)`
    options = {
      query: sql,
      params: {id0: id[0].contentId.toString(), id1: id[1].contentId.toString(), id2: id[2].contentId.toString()} 
    }
    let [locationsRec] = await bigqueryClient.query(options)
    let locationInfo = [];
    for (let i = 0; i < 3; i++) {
      let queryInfo = await findDistance(locationsRec[i].locationName)
      locationInfo.push({
        "locationName": locationsRec[i].locationName,
        "distance": queryInfo[0],
        "time": queryInfo[1]
      })
    } 
    let jsonResponse = {
      "fulfillment_response": {
        "messages": [
          {
            payload:{
              richContent: [
                [
                  {
                    "type": "image",
                    "rawUrl": "https://thumbs.dreamstime.com/b/artificial-intelligence-ai-robot-gives-recommendation-human-get-automated-response-chatbot-business-consulting-system-122165563.jpg",
                    "accessibilityText": "Recommendation Bot"
                  },
                  // {
                  //   "type": "info",
                  //   "title": "RecTrip Bot",
                  //   "subtitle": "Based on your profile, you may want to check out these destinations on your trip!",
                  // },
                  {
                    "type": "list",
                    "title": `${locationInfo[0].locationName}`,
                    "subtitle": `${locationInfo[0].distance} away. ${locationInfo[0].time} by car.`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${locationsRec[1].locationName}`,
                    "subtitle": `${locationInfo[1].distance} away. ${locationInfo[1].time} by car.`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  },
                  {
                    "type": "divider"
                  },
                  {
                    "type": "list",
                    "title": `${locationsRec[2].locationName}`,
                    "subtitle": `${locationInfo[2].distance} away. ${locationInfo[2].time} by car.`,
                    "event": {
                      "name": "",
                      "languageCode": "",
                      "parameters": {}
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      // "session_info": {
      //     "session": session_name,
      //     "parameters": {
      //         "optionA": locationsRec[0],
      //         "optionB": locationsRec[1],
      //         "optionC": locationsRec[2],
      //     }
      //   }
    }
    res.status(200).send(jsonResponse);
  }

  if (tag==='recommendGeneral') {
    recommendGeneral()
  }
  if (tag==='recommendTour') {
    recommendTour()
  }
  if (tag==='recommendHotel') {
    recommendHotel()
  }
  if (tag==='recommendFlight') {
    recommendFlight()
  }
  if (tag==='recommendLocation') {
    recommendLocation()
  }
};
