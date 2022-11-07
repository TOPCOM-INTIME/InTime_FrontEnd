import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';
function PlaceinputForm({createChangeTextHandler, isFind}){
    const start = useRef();
    const end = useRef();
    
    return(
      <>
      <BorderedInput
        placeholder="출발지"
        ref={start}
        keyboardType="text"
        returnKeyType="next"
        onChangeText={createChangeTextHandler('start')}
        hasMarginBottom
      />
      <BorderedInput
        placeholder="도착지"
        ref={end}
        returnKeyType="next"
        onChangeText={createChangeTextHandler('end')}
        hasMarginBottom
      />    
    </>
    );
}


export default PlaceinputForm;