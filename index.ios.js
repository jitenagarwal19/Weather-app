//The weather app allows users to move his/her pin on the map and the app fetches weather information of that location.

var React = require("react-native");


var {
  AppRegistry,
  View,
  MapView,
  Text,
  StyleSheet
} = React;

//code to fetch imformation for a location's weather is written here
var Api = require('./src/api');


var Weather = React.createClass({
//State helps our app to keep track of the status of the app, whenever state is updated ui is redrawn or the render function is called again,
//i am using state here to keep track of pin on the map and later various imformation for that pin and displaying these state variables on the UI.
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };

  },

  render: function() {

//the render function in react-native is used to show all the UI component. I have written my UI components in JSX format.
//I am using Native MapView to show a map but this is only availabe for iOS not for android :(.
//whenever a user is done moving the pin onRegionChangeComplete method is delegated which helps us to get latitude and longitude of that location we will use this to fetch weather information
//annotations in the mapview is used to show the pin in the middle of the screen for better user experience.
    return <View style = {styles.container}>
    <MapView style = {styles.map}
      annotations = {[this.state.pin]}
        onRegionChangeComplete = {this.onRegionChangeComplete}
      ></MapView>
    <View style = {styles.messageView}>
        <Text>
          City : {this.state.city}
        </Text>

        <Text style={this.temperatureColor()}>
          Temperature : {this.state.temperature}
        </Text>
        <Text>
          Description: {this.state.description}
        </Text>
      </View>
    </View>;

  },
  //temperatureColor method is used to return the color for temperature depending on the weather.
  temperatureColor: function()
  {
    var color;
    var temp = this.getIntegerTemperature(this.state.temperature)

    if (temp > '20') {
      color = 'red';
    } else if (temp < '20'){
      color = 'blue';
    }
    return {
      color:color
    };
  },
  //since i was getting weather as this format '12 C' i needed to get the integer part for the comparision.
  getIntegerTemperature: function(temperatureString)
  {
    var temp = temperatureString.substring(0, temperatureString.length - 2);
    return eval(temp);
  },

//this is called when user is done moving the pin in the map.
  onRegionChangeComplete: function(region) {
    // console.log(Api.code);
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude

      }

    });
    //setting the data from the api using state.
    Api(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);

      this.setState(data);
    });
  }
});
//styles for various components
var styles = StyleSheet.create({
  container : {
    flex: 1
  },
  map:{
    flex: 7
  },
  messageView: {
    flex:3,
    justifyContent: 'center',
    alignItems:'center'
  },

});


AppRegistry.registerComponent('weather', ()=>Weather);
