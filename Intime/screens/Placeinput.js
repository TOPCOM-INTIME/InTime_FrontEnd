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
  Pressable,
} from 'react-native';
import FindButton from '../components/FindButton';
import PlaceinputForm from '../components/PlaceinputForm';


function Placeinput({navigate, route}){
  const [loading, setLoading] = useState(false);


return(
  <>
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView>
        <View style={styles.form}>
          <PlaceinputForm
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
    backgroundColor:'white'
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle:{
  fontSize: 24,
  color: 'black',
  fontWeight: 'bold'
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

