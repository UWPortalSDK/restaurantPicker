function getOpenData() {
   	var radius = args.Get("r");
    var price = args.Get("p");
    var openNow = args.Get("o");
    var mood = args.Get("m");
    var vegetarian = args.Get("vege");
    var vegan = args.Get("v");
    var categories = "";
    var range = 60;
    /*switch(mood){
        case "Thirsty":
            categories = "drinks,bubbletea,cafe,coffee";
            range = 4;
            break;
        case "Lazy":
            categories = "fastfood";
            range = 60;
            break;
        case "Cranky":
            categories = "desserts";
            range = 2;
            break;
        case "Hungover":
            categories = "";
            break;
        case "Stressed":
            categories = "dessert,drinks,bubbletea,cafe,fastfood";
            break;
        case "Happy":
            categories = "";
          	break;
        case "Party!!":
            categories = "bars,bar,club";
            break;
        default:
            categories = "";
    }*/
            
    
    if (openNow != "Yes"){
    	openNow = "false";
    }
    else {
    	openNow = "true";
    }
    if (price == "$"){
    	price = "1";
        range = 25;
    }
    else if (price == "$$"){
    	price = "1,2";
        range = 50;
    }
    else if (price == "$$$"){
    	price = "1,2,3";
        range = 60;
    }
    else{
        price = "1,2,3,4";
        range = 60;
    }
    if (vegan == "Yes"){
    	categories += "vegan,";
    }
    if (vegetarian == "Yes"){
    	categories += "vegetarian,";
    }
    
    if (radius == "Walkable"){
    	radius = "2000";
    }
    else {
    	radius = "5000";
        range *= 3;
    }
    var randomizer = Math.floor((Math.random() * range));
	var requestConfig = {headers: { Authorization:privateDataService.Get('Authorization')}
};  
    return proxy.GetProxy('https://api.yelp.com/v3/businesses/search?latitude=43.4723&longitude=-80.5449&radius='+ radius +'&limit=4&offset='+ randomizer +'&term=food&price=' + price + '&categories=' + categories + '&open_now=' + openNow, requestConfig);
}

function getMockData(){
    var data = {
    "businesses": [
        {
            "id": "bao-sandwich-bar-waterloo",
            "name": "Bao Sandwich Bar",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/kPJmtio8S4TRYCqK3FMc6g/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/bao-sandwich-bar-waterloo?adjust_creative=x7k-8J9DN36jTnGufNm_cg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=x7k-8J9DN36jTnGufNm_cg",
            "review_count": 170,
            "categories": [
                {
                    "alias": "vietnamese",
                    "title": "Vietnamese"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "asianfusion",
                    "title": "Asian Fusion"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 43.47646,
                "longitude": -80.52987
            },
            "transactions": [],
            "price": "$",
            "location": {
                "address1": "62 Balsam Street",
                "address2": "Unit 106",
                "address3": "",
                "city": "Waterloo",
                "zip_code": "N2L 3H2",
                "country": "CA",
                "state": "ON",
                "display_address": [
                    "62 Balsam Street",
                    "Unit 106",
                    "Waterloo, ON N2L 3H2",
                    "Canada"
                ]
            },
            "phone": "+15192081226",
            "display_phone": "+1 519-208-1226",
            "distance": 1297.936089614
        },
        {
            "id": "kickoff-waterloo",
            "name": "Kickoff",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Z2N2C70cIt_rEw1ZIGCobw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/kickoff-waterloo?adjust_creative=x7k-8J9DN36jTnGufNm_cg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=x7k-8J9DN36jTnGufNm_cg",
            "review_count": 14,
            "categories": [
                {
                    "alias": "sportsbars",
                    "title": "Sports Bars"
                }
            ],
            "rating": 5,
            "coordinates": {
                "latitude": 43.472775,
                "longitude": -80.53796
            },
            "transactions": [],
            "price": "$",
            "location": {
                "address1": "170 University Avenue W",
                "address2": "",
                "address3": "",
                "city": "Waterloo",
                "zip_code": "N2L 3E9",
                "country": "CA",
                "state": "ON",
                "display_address": [
                    "170 University Avenue W",
                    "Waterloo, ON N2L 3E9",
                    "Canada"
                ]
            },
            "phone": "+15198889699",
            "display_phone": "+1 519-888-9699",
            "distance": 562.7055378792
        }
    ],
    "total": 356,
    "region": {
        "center": {
            "longitude": -80.5449,
            "latitude": 43.4723
        }
    }
};
    // Need to convert response object to string
    return JSON.stringify(data);
}