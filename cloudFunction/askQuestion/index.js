/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  const axios = require('axios');
  const tag = req.body.fulfillmentInfo.tag;
  const mapskey = 'AIzaSyCu3Udg6Li2WxMMhohA3DhUH_ZIGVzwDaM';

  async function informationQuestion() {
    let session_name = req.body.sessionInfo.session
    let location = req.body.sessionInfo.parameters.asklocationstart.original
    
    // Get place_id (Places API)
    let url_searchplaceid = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ location.split(' ').join('+') + '+Bangkok&key=' + mapskey;
    let place_info = await axios.get(url_searchplaceid)
    let place_id = place_info.data.results[0].place_id
  
    // Places API
    let url_description = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=` + mapskey;
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

  async function distanceQuestion() {
    let session_name = req.body.sessionInfo.session
    let prevlocation = req.body.sessionInfo.parameters.asklocationstart.original
    let newlocation = req.body.sessionInfo.parameters.asklocationfinish.original
    
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

  if (tag === 'informationQuestion') {
    informationQuestion();
  }
  if (tag === 'distanceQuestion') {
    distanceQuestion();
  }
};
