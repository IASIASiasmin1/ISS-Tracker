import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Image
} from "react-native";

export default class Homescreen extends Component {
  render() {
    return (
      <View style={styles.container}>

        <SafeAreaView style={styles.droidSafeArea}/>

        <ImageBackground source={require("../assets/bg_image.png")} style={styles.backgroundStyle}>


        <View style={styles.titleBar}>
          <Text style={styles.titleText}>App Rastreador EEI</Text>
        </View>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Location")}} style={styles.routeCard}>  
          <Text style={styles.routeText}>ISS Location</Text>
          <Text style={styles.knowMore}>{"Saiba Mais -->"}</Text>
          <Image source={require("../assets/iss_icon.png")} style={styles.imageStyle}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Meteors")}} style={styles.routeCard}>
          <Text style={styles.routeText}>Meteoros</Text>
          <Text style={styles.knowMore}>{"Saiba Mais -->"}</Text>
          <Image source={require("../assets/meteor_icon.png")} style={styles.imageStyle}></Image>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => {this.props.navigation.navigate("Updates")}} style={styles.routeCard}>
          <Text style={styles.routeText}>Atualizações</Text>
          <Text style={styles.knowMore}>{"Saiba Mais -->"}</Text>
          <Image source={require("../assets/rocket_icon.png")} style={styles.imageStyle}></Image>
        </TouchableOpacity>

        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: { fontSize: 40, fontWeight: "bold", color: "white" },

  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "white",
  },

  routeText: {
     fontSize: 35, 
    fontWeight: "bold",
     color: "black", 
     marginTop: 75, 
     paddingLeft: 30 
    },

    knowMore: { 
         paddingLeft: 30, 
         color: "red",
         fontSize: 15 },

    backgroundStyle:{
        resizeMode: "cover",
        flex: 1
    },     
   
    imageStyle: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain" ,
        right: 20,
        top: -80

    
    }

});
