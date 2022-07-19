package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"

	"github.com/gorilla/mux"
)

type Language struct {
	English bool `json:"english"`
	Thai    bool `json:"thai"`
}

var selectedLanguage Language

type Page1 struct {
	Waterfalls                  bool `json:"waterfalls"`
	Sea                         bool `json:"sea"`
	Mountains                   bool `json:"mountains"`
	Dams                        bool `json:"dams"`
	Zoos                        bool `json:"zoos"`
	Camping                     bool `json:"camping"`
	Museums                     bool `json:"museums"`
	Temples                     bool `json:"temples"`
	ThemeParks                  bool `json:"themeParks"`
	CityTours                   bool `json:"cityTours"`
	SnorkellingAndScubaDiving   bool `json:"snorkellingAndScubaDiving"`
	HotSpringAndOnzen           bool `json:"hotSpringAndOnzen"`
	CulturalTourism             bool `json:"culturalTourism"`
	Ecotourism                  bool `json:"ecotourism"`
	Forests                     bool `json:"forests"`
	Wellness                    bool `json:"wellness"`
	Gastronomy                  bool `json:"gastronomy"`
	StaycationWorkcation        bool `json:"staycationWorkcation"`
	CruiseTour                  bool `json:"cruiseTour"`
	LocalAttractions            bool `json:"localAttractions"`
	Adventures                  bool `json:"adventures"`
	PerformanceAndEntertainment bool `json:"performanceAndEntertainment"`
	TravelByTrain               bool `json:"travelByTrain"`
	TravelByPlane               bool `json:"travelByPlane"`
	TravelByBus                 bool `json:"travelByBus"`
	TravelByRentalCar           bool `json:"travelByRentalCar"`
}

type Page2 struct {
	SoloTraveller bool `json:"soloTraveler"`
	MyFriends     bool `json:"myFriends"`
	MyLove        bool `json:"myLove"`
	MyLovelyPet   bool `json:"myLovelyPet"`
	MyColleagues  bool `json:"myColleagues"`
	MyFamily      bool `json:"myFamily"`
}

type Page3 struct {
	HalfDayTrip      bool `json:"halfDayTrip"`
	OneDayTrip       bool `json:"oneDayTrip"`
	TwoDayOneNight   bool `json:"twoDayOneNight"`
	TwoNights        bool `json:"twoNights"`
	ThreeNights      bool `json:"threeNights"`
	AboveThreeNights bool `json:"aboveThreeNights"`
}

type Page4 struct {
	LessThan1000 bool `json:"lessThan1000"`
	Within3000   bool `json:"within3000"`
	Within5000   bool `json:"within5000"`
	Within7000   bool `json:"within7000"`
	Within10000  bool `json:"within10000"`
	Above10000   bool `json:"above10000"`
}

// NOT USED
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to HomeHandler")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w)
}

func HomeSearchHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to HomeSearchHandler")
	w.Header().Set("Content-Type", "application/json")
	if len(mux.Vars(r)["searchItem"]) == 0 {
		w.WriteHeader(http.StatusBadRequest)
	} else {
		w.WriteHeader(http.StatusNotAcceptable)
	}
	json.NewEncoder(w)
}

// NOT USED
func SettingLanguageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to SettingLanguageHandler")
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(selectedLanguage)
	params := mux.Vars(r)
	language := params["new_lang"]
	if len(language) == 0 {
		w.WriteHeader(http.StatusBadRequest)
	} else {
		if language == "Thai" {
			selectedLanguage = Language{English: false, Thai: true}
		} else if language == "English" {
			selectedLanguage = Language{English: true, Thai: false}
		} else {
			w.WriteHeader(http.StatusBadRequest)
		}
		log.Println(selectedLanguage)
		// save selectedLanguage to BigQuery
	}
	json.NewEncoder(w)
}

func Page1Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to Page1Handler")
	w.Header().Set("Content-Type", "application/json")
	// fmt.Println(r.Body)
	var userInfo1 Page1
	_ = json.NewDecoder(r.Body).Decode(&userInfo1)

	fmt.Println(userInfo1)
	fmt.Println(userInfo1.Waterfalls)
	fmt.Println(userInfo1.TravelByPlane)
	// fmt.Println(userInfoPage1)
	// fmt.Println(reflect.ValueOf(userInfo1).NumField())

	v := reflect.ValueOf(userInfo1)
	var count = 0
	values := make([]interface{}, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Field(i).Interface()
		if values[i] == true {
			count++
		}
	}
	// fmt.Println(values)
	// fmt.Println(count)
	if (Page1{}) == userInfo1 || count < 3 {
		w.WriteHeader(http.StatusNotAcceptable)
	}

	// for i := 0; i < reflect.ValueOf(userInfo1).NumField() ; i++ {
	// 	if userInfo1[i] == true {
	// 		count++
	// 	}

	// save userInfo1 to BigQuery
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(userInfo1)
}

func Page2Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to Page2Handler")
	w.Header().Set("Content-Type", "application/json")
	var userInfo2 Page2
	_ = json.NewDecoder(r.Body).Decode(&userInfo2)
	fmt.Println(userInfo2)

	v := reflect.ValueOf(userInfo2)
	var count = 0
	values := make([]interface{}, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Field(i).Interface()
		if values[i] == true {
			count++
		}
	}
	if (Page2{}) == userInfo2 || count < 2 {
		w.WriteHeader(http.StatusNotAcceptable)
	}
	// save userinfo2 to BigQuery
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(userInfo2)
}

func Page3Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to Page3Handler")
	w.Header().Set("Content-Type", "application/json")
	var userInfo3 Page3
	_ = json.NewDecoder(r.Body).Decode(&userInfo3)
	fmt.Println(userInfo3)

	v := reflect.ValueOf(userInfo3)
	var count = 0
	values := make([]interface{}, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Field(i).Interface()
		if values[i] == true {
			count++
		}
	}
	if (Page3{}) == userInfo3 || count != 1 {
		w.WriteHeader(http.StatusNotAcceptable)
	}
	// save userinfo3 to BigQuery
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(userInfo3)

	// fmt.Println("Request came to Page3Handler")
	// w.Header().Set("Content-Type", "application/json")
	// params := mux.Vars(r)
	// tripLength := params["optionTripLength"]
	// log.Println(tripLength)

	// page3options := [6]string{"HalfDayTrip", "OneDayTrip", "TwoDays1Night", "TwoNights", "ThreeNights", "Above3Nights"}
	// for _, x := range page3options {
	// 	if x == tripLength {
	// 		w.WriteHeader(http.StatusOK)
	// 		break
	// 	}
	// }

	// save tripLength to BigQuery
	// w.WriteHeader(http.StatusNotAcceptable)
	// json.NewEncoder(w).Encode(tripLength)
}

func Page4Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to Page4Handler")
	w.Header().Set("Content-Type", "application/json")
	var userInfo4 Page4
	_ = json.NewDecoder(r.Body).Decode(&userInfo4)
	fmt.Println(userInfo4)

	v := reflect.ValueOf(userInfo4)
	var count = 0
	values := make([]interface{}, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Field(i).Interface()
		if values[i] == true {
			count++
		}
	}
	if (Page4{}) == userInfo4 || count != 1 {
		w.WriteHeader(http.StatusNotAcceptable)
	}
	// save userInfo4 to BigQuery
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(userInfo4)

	// fmt.Println("Request came to Page4Handler")
	// w.Header().Set("Content-Type", "application/json")
	// params := mux.Vars(r)
	// accomBudget := params["optionAccomBudget"]
	// log.Println(accomBudget)

	// page4options := [6]string{"LessThan1000", "Within3000", "Within5000", "Within7000", "Within10000", "Above10000"}
	// for _, x := range page4options {
	// 	if x == accomBudget {
	// 		w.WriteHeader(http.StatusOK)
	// 		break
	// 	}
	// }

	// save accomBudget to BigQuery
	// w.WriteHeader(http.StatusNotAcceptable)
	// json.NewEncoder(w).Encode(accomBudget)
}

func TravelSearchHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request came to TravelSearchHandler")
	w.Header().Set("Content-Type", "application/json")
	if len(mux.Vars(r)["param"]) == 0 {
		w.WriteHeader(http.StatusBadRequest)
	} else {
		w.WriteHeader(http.StatusNotAcceptable)
	}
	json.NewEncoder(w)
}

func main() {
	fmt.Println(("Initializing application..."))
	// certManager := autocert.Manager{
	// 	Prompt:     autocert.AcceptTOS,
	// 	HostPolicy: autocert.HostWhitelist("localhost:5555/"), //Your domain here
	// 	Cache:      autocert.DirCache("cache"),                //Folder for storing certificates
	// }
	// server := &http.Server{
	// 	Addr: ":https",
	// 	TLSConfig: &tls.Config{
	// 		GetCertificate: certManager.GetCertificate,
	// 	},
	// }

	// Mock data
	selectedLanguage = Language{
		English: true,
		Thai:    false,
	}

	// Init Router, Route Handlers/ Endpoints
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler).Methods("GET") // NOT USED
	r.HandleFunc("/search/{searchItem}", HomeSearchHandler).Methods("GET")
	r.HandleFunc("/setting/language/{new_lang}", SettingLanguageHandler).Methods("PUT") // NOT USED
	r.HandleFunc("/page1", Page1Handler).Methods("POST")
	r.HandleFunc("/page2", Page2Handler).Methods("POST")
	r.HandleFunc("/page3", Page3Handler).Methods("POST")
	r.HandleFunc("/page4", Page4Handler).Methods("POST")
	r.HandleFunc("/travel/search/{param}", TravelSearchHandler).Methods("GET")
	// go http.ListenAndServe(":http", certManager.HTTPHandler(nil))

	log.Fatal(http.ListenAndServe(":8000", r))

	// http.ListenAndServeTLS(":8000", "localhost.crt", "localhost.key", nil)

	// err := http.ListenAndServeTLS(":8000", fullchain.pem, privkey.pem, nil)
	// if err != nil {
	// 	log.Fatal(err)
	// }
}
