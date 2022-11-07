import React, {useState} from 'react';
import{
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
  Pressable
} from 'react-native';
import CustomButton from '../components/CustomButton';
import FindButton from '../components/FindButton';
import PlaceinputForm from '../components/PlaceinputForm';
import CarShowTime from './CarShowTime';


function Placeinput({navigate, route}){
  const {isFind} = route.params || {};
  // console.log("Placeinput",isFind)
  const [placeData, setPlaceData] = useState({
    start: '',
    end: '',
  });
  const createChangeTextHandler = name => value => {
    setPlaceData({...placeData, [name]: value});
  };
  const [loading, setLoading] = useState(false);

return(
  <>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullscreen}>
          <Text style={styles.text}>장소입력</Text>
          <View style={styles.form}>
            <PlaceinputForm
             createChangeTextHandler={createChangeTextHandler}
             isFind={isFind}
            />
           <FindButton
               placeData={placeData}
               loading={loading}
               isFind={isFind}
           />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
 </>
)
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});




export default Placeinput;

