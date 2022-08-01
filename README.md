# Google Tour Planner Project

Internship project at Google (Thailand) Company Limited as a Customer Solutions Consultant intern.

4 Folders:
1. cloudFunction - Cloud native functions for hosting the business logic of the Dialogflow agent
2. dialogflowAgent - Exported conversational agent from Dialogflow CX (.json)
3. frontEnd - React Native code for the prototype iOS application
4. backEnd - Server code for application logic request handling in Go

## Cloud Function 

Deploy the source code onto Cloud Function in a Google Cloud project.

It is highly recommended to separate each functions as appropriate for clarity when making Webhook calls.

Use the generated HTTPs URL for each function to generate Webhooks in a Dialogflow CX agent.

8 functions:
1. askQuestion
   - Contains a global parameter: mapskey
   - Make API calls to Google Maps APIs such as Places API and Distance Matrix API
   - Return json data to the Dialogflow CX agent 
2. bookFlightFunction
   - Query flight details from the database (one-way and round trip flight)
   - Set parameters for the selected flight option
   - Calculate cost from the no. of tickets booked
   - Return fulfillment_response to the Dialogflow CX agent to generate a rich response
3. bookHotelFunction
   - Query hotel details from the database
   - Set paramters for the selected hotel option
   - Calculate cost from the no. of rooms booked and length of stay 
   - Return fulfillment_response to the Dialogflow CX agent to generate a rich response
4. createPDF
   - Contains a fonts folder for Roboto text style
   - Query a user's trip events from the database
   - Generate a pdf file containing the user's details
     - Create a table from the list of trip events
   - Save the file to a Google Cloud Storage bucket
   - Return fulfillment_response to the Dialogflow CX agent containing the url to the pdf file
5. payment
   - Query total amount due from a user's id
   - Return calculated cost due to the Dialogflow CX agent
6. recommendation
   - Return recommended items to the Dialogflow CX agent
     - Items returned may be filtered by its category (Hotels, Flights, Tour, Locations)  
7. startUp
   - Delete items in Event_Recorder and Transaction_Records table
   - Used for testing purposes when the system had no user authentication support
8. tripFlow
   - Supports Create Trip Flow and Create Trip Event Flow in the Dialogflow CX agent
   - Contains similar functions from the bookHotelFunction and bookFlightFunction
   - Separate functions for each trip events categories: Shop, Travel, Eat, and Hotel
     - Make API calls to Google Maps APIs such as Places API and Distance Matrix API
     - Set paramteres for the selected option
     - Save trip events and transaction details into the database
   - Return fulfillment_response to the Dialogflow CX agent to generate a rich response

## Dialogflow Agent

At the time in which this documentation is written, it is not possible to import a downloaded Dialogflow CX agent directly.

Create a new agent within the same Google Cloud project and Location.

7 Flows:
1. Default State Flow 
   - The first flow which initializes the conversation with the user
   - Include event error handling to inform the user about the Chat bot's functionality
   - Leads user into 4 possible flows: Ask Question, Book Hotel, Book Flight, and Create Trip
2. Ask Question Flow 
   - Created as a Route Group to ensure that the flow can be accessed at any point during the conversation
   - Should include an 'End Flow' page to return the user back to their previous conversation
   - 3 possible types of question: FAQ list, Information Question, and Distance Queston
3. Book Hotel Flow 
   - Allows a user to book hotel room(s)
   - Calculate user's payment amount due from no. of rooms booked and length of stay
4. Book Flight Flow 
   - Allows a user to book a one-way flight or a round trip flight
   - Calculate user's payment amount due from no. of tickets booked
5. Create Trip Flow 
   - Allows a user to plan their trip starting from a flight
   - If the user selects a one-way flight, prompt the user to create book a return flight
   - Direct a user into the Create Trip Event flow
6. Create Trip Event Flow
   - Recurring flow which allows a user to constantly create trip events
   - Categorise trips events into Shop, Travel, Eat, and Hotel
     - Collect location, budget planned, and length of stay for each events
     - For Hotel trip events, query the room's cost from the database 
   - When the user indicates the final event, generate a PDF file for the user to review their trip events
7. Payment Flow 
   - Final flow from Book Hotel Flow, Book Flight Flow, and Create Trip Event Flow
   - Show the total amount due and a QR code image

For further reference, access the dialogflowAgent folder

## Front End

Git Clone the source code from the frontEnd branch

`yarn add` to install the relevant dependencies

`expo start` to initialise the simulator

The frontend source code includes the application's deployment process.

## Back End

Git Clone the source code from the backEnd branch

To create a temporary HTTPs url, use ngrok.

The backend source code includes the Docker containerization process.

## Database

Use Cloud SQL as the primary database of the system. Ingest data into BigQuery.

BigQuery Table Schema

**Airport**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
| airport_id | STRING | REQUIRED |
| airport_name | STRING | NULLABLE |
| city | STRING | NULLABLE |
| country | STRING | NULLABLE |

**Event_Recorder**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
| user_id | STRING | NULLABLE |
| event_type| STRING | NULLABLE |
| time_start | DATETIME | NULLABLE |
| time_end | DATETIME | NULLABLE |
|budget|STRING|NULLABLE|
|location_start|STRING|NULLABLE|	
|location_end|STRING|NULLABLE|		
|description|STRING|NULLABLE|	

**Flights_OneWayAll**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|flight_id|	STRING|NULLABLE|
|airport_depart|STRING|NULLABLE|
|city_depart|STRING|NULLABLE|
|country_depart|STRING|NULLABLE|
|airport_arrive|STRING|NULLABLE|
|city_arrive|STRING|NULLABLE|
|country_arrive|STRING|NULLABLE|
|depart_day|DATE|NULLABLE|
|depart_time|TIME|NULLABLE|
|arrive_day|DATE|NULLABLE|
|arrive_time|TIME|NULLABLE|		
|airline|STRING|NULLABLE|
|price|STRING|NULLABLE|		
|item_id|STRING|NULLABLE|	

**Flights_RoundAll**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|flight_id|STRING|NULLABLE|		
|airport_depart1|STRING	NULLABLE|		
|airport_arrive1|STRING	NULLABLE|		
|depart_day1|DATE|NULLABLE|		
|depart_time1|TIME|NULLABLE|		
|arrive_day1|DATE|NULLABLE|		
|arrive_time1|TIME|NULLABLE|		
|airline1|STRING|NULLABLE|		
|airport_depart2|STRING|NULLABLE|		
|airport_arrive2|STRING|NULLABLE|		
|depart_day2|DATE|NULLABLE|		
|depart_time2|TIME|NULLABLE|		
|arrive_day2|DATE|NULLABLE|		
|arrive_time2|TIME|NULLABLE|		
|airline2|STRING|NULLABLE|		
|price|STRING|NULLABLE|		
|flight_id2|STRING|NULLABLE|		
|item_id|STRING|NULLABLE|	

**Hotels**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|hotel_id|STRING|NULLABLE|		
|hotel_name|STRING|NULLABLE|		
|hotel_city|STRING|NULLABLE|		
|price|STRING|NULLABLE|		
|room_no|INTEGER|NULLABLE|

**Recommendation_Content**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|predicted_rating_confidence|FLOAT|NULLABLE|		
|visitorId|INTEGER|NULLABLE|
|contentId|INTEGER|NULLABLE|

Generated table from the Matrix Factorization model. Does need to be created manually.

**Transaction_Records**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id|STRING|NULLABLE|		
|transaction_type|STRING|NULLABLE|		
|amount|STRING|NULLABLE|		
|item_id|STRING|NULLABLE|	

**Travel_Location**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|location_id|STRING|NULLABLE|	
|location_name|STRING|NULLABLE|		
|location_description|STRING|NULLABLE|		

**Travel_Tour**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|tour_id|STRING|NULLABLE|		
|tour_name|STRING|NULLABLE|	

**User**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id|STRING|NULLABLE|		
|firstname|STRING|NULLABLE|		
|middlename|STRING|NULLABLE|		
|lastname|STRING|NULLABLE|		
|age|STRING|NULLABLE|		
|gender|STRING|NULLABLE|		
|phone_no|STRING|NULLABLE|		
|email|STRING|NULLABLE|		

**User_AllTransaction**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|id|INTEGER|REQUIRED|		
|visitorId|INTEGER|REQUIRED|	
|contentId|INTEGER|REQUIRED|		
|rating|FLOAT|REQUIRED|		

Training and testing data for the BigQuery ML.

**User_TripOnboarding1**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id|STRING	|NULLABLE		|
|waterfalls|BOOLEAN	|NULLABLE		|
|sea|BOOLEAN	|NULLABLE		|
|mountains|BOOLEAN	|NULLABLE	|	
|dams|BOOLEAN	|NULLABLE	|	
|zoos|BOOLEAN	|NULLABLE		|
|camping|BOOLEAN	|NULLABLE		|
|museums|BOOLEAN	|NULLABLE	|	
|temples|BOOLEAN|	NULLABLE	|	
|themeParks|BOOLEAN|	NULLABLE	|	
|cityTours|BOOLEAN	|NULLABLE	|	
|snorkellingAndScubaDiving|BOOLEAN	|NULLABLE|		
|hotSpringAndOnzen|BOOLEAN	|NULLABLE|		
|culturalTourism|BOOLEAN	|NULLABLE|		
|ecotourism|BOOLEAN	|NULLABLE		|
|forests|BOOLEAN	|NULLABLE	|	
|wellness|BOOLEAN	|NULLABLE	|	
|gastronomy|BOOLEAN	|NULLABLE	|	
|staycationWorkcation|BOOLEAN	|NULLABLE	|	
|cruiseTour|BOOLEAN	|NULLABLE		|
|localAttractions|BOOLEAN|	NULLABLE	|	
|adventures|BOOLEAN	|NULLABLE|		
|performanceAndEntertainment|	BOOLEAN|	NULLABLE|		
|travelByTrain|	BOOLEAN	|NULLABLE|		
|travelByPlane|	BOOLEAN|	NULLABLE		|
|travelByBus|	BOOLEAN|	NULLABLE		|
|travelByRentalCar|	BOOLEAN	|NULLABLE	|

**User_TripOnboarding2**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id	|STRING|	NULLABLE		|
|SoloTraveller|	BOOLEAN|	NULLABLE	|	
|MyFriends	|BOOLEAN|	NULLABLE		|
|MyLove	|BOOLEAN|	NULLABLE	|	
|MyLovelyPet	|BOOLEAN|	NULLABLE|		
|MyColleagues|	BOOLEAN	|NULLABLE|		
|MyFamily	|BOOLEAN|	NULLABLE|		

**User_TripOnboarding3**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id|	STRING|	NULLABLE|		
|HalfDayTrip|	BOOLEAN|	NULLABLE|		
|OneDayTrip|	BOOLEAN|	NULLABLE|		
|TwoDayOneNight|	BOOLEAN|	NULLABLE|		
|TwoNights|	BOOLEAN|	NULLABLE|		
|ThreeNights|	BOOLEAN|	NULLABLE|		
|AboveThreeNights|	BOOLEAN|	NULLABLE|	

**User_TripOnboarding4**
| Tables   |      Type      |  Mode |
|----------|:-------------:|------:|
|user_id|	STRING|	NULLABLE|		
|LessThan1000|	BOOLEAN|	NULLABLE|		
|Within3000|	BOOLEAN|	NULLABLE|		
|Within5000|	BOOLEAN|	NULLABLE|		
|Within7000|	BOOLEAN|	NULLABLE|		
|Within10000|	BOOLEAN|	NULLABLE|		
|Above10000|	BOOLEAN|	NULLABLE|	
