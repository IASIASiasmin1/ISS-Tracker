import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  keyExtractor = (item, index) => {
    index.toString();
  };

  renderItem = ({ item }) => {
    var meteor = item;
    var bgImage, gifSpeed, size;

    if (meteor.threat_score <= 30) {
      bgImage = require("../assets/meteor_bg1.png");
      gifSpeed = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bgImage = require("../assets/meteor_bg2.png");
      gifSpeed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else if (meteor.threat_score > 75) {
      bgImage = require("../assets/meteor_bg3.png");
      gifSpeed = require("../assets/meteor_speed3.gif");
      size = 200;
    }

    return (
      <View>
        <ImageBackground source={bgImage} style={styles.bgStyle}>
          <View style={styles.containerStyle}>
            <Image
              source={gifSpeed}
              style={{ width: size, height: size, alignSelf: "center" }}
            ></Image>
            <View>
              <Text style={styles.titleName}>{meteor.name}</Text>
              <Text style={styles.textStyle}>
                Mais próximo da terra -
                {meteor.close_approach_data[0].close_approach_data_full}
              </Text>
              <Text style={styles.textStyle}>
                Diâmetro mínimo em quilômetros -
                {meteor.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={styles.textStyle}>
                Diâmetro máximo em quilômetros -
                {meteor.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={styles.textStyle}>
                Velocidade em quilômetros por hora -
                {
                  meteor.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style={styles.textStyle}>
                Distância da Terra em quilômetros -
                {meteor.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Carregando</Text>
        </View>
      );
    } else {
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteor_arr);

      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threat_score = threatScore;
      });

      meteors.sort(function (meteor1, meteor2) {
        return meteor2.threat_score - meteor1.threat_score;
      });

      meteors = meteors.slice(0, 5);

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            horizontal={true}
            data={meteors}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bgStyle: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  titleName: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 400,
    marginLeft: 50
    },

  textStyle: {
    color: "#ffffff",
    marginTop: 10,
    marginLeft: 50, 
  }  
});
