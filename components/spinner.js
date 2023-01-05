import React, { useState } from 'react';

//import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

const Spinners = () => {
const [loading, setLoading] = useState(true);



  return (
    
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
     
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
 
   
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default Spinners;