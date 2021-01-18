import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";

import {Card} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Col} from 'reactstrap'

import { connect } from 'react-redux';


const {Meta} = Card;


// function Heart (props){
  
//   const [likeEventState,setLikeEventState ] = useState ( '#FFFFFF' );
  
//   useEffect( ()=>{
//     const upStateHeart = ()=> {
//       setLikeEventState((props.user && props.x.popularite && isUserLikedEvent(props.user._id, props.x.popularite) !== -1 ) ? '#D70026' : '#FFFFFF')
//     }
//     upStateHeart();
//   }, [props.user])
  
  
//   async function likeEvent(user, event){
    
//     console.log("LIKÉ event", event._id);
    
//     if (user  === null){
//       console.log('props.navigation:', props.navigation);
//       props.navigation.navigate('SignInScreen');
//     }else{
//       console.log("Heart : user.id=", user._id);

//       var responseBE;
//       var index = isUserLikedEvent(user._id, event.popularite); 

//       console.log ('analise likes: index=', index);
//       if (  index !== -1 ){
//         setLikeEventState( '#FFFFFF' );
//         event.popularite.splice(index, 1);
//         responseBE = await fetch(`${urlLocal}/unlikeEvent?idEvent=${event._id}&idUser=${user._id}`);
//         console.log('Result: unLike event=', event._id, ' user=', user._id)
//       }else{
//         setLikeEventState( '#D70026' );
//         event.popularite.unshift(user._id);
//         responseBE = await fetch(`${urlLocal}/likeEvent?idEvent=${event._id}&idUser=${user._id}`);
//         console.log('Result: Like event=', event._id, ' user=', user._id)
//       }
//       console.log(responseBE);
//     }
//   }




//   function isUserLikedEvent (u, popularite){
//     console.log('isUserLikedEvent; popularite=', popularite);
//     var result = false;
//     if (u){
//       var i=0;
//       while ( !result &&  i < popularite.length){
//         if (u == popularite[i]){
//           result = true;
//           console.log('User liked, index = ', i);
//         }
//         i++;
//       }
//     }
//     console.log('result=', result);
//     if ( result ){
//       return  i-1;
//     }
//     return -1;
//   }



//   return (

//           <AntDesign
            
//             name="heart"
//             size={25}
//             style={props.style}
//             color={ likeEventState } 
//             // color={ (props.user && isUserLikedEvent(props.user._id, props.x.popularite) ) ? '#D70026' : '#FFFFFF' } 
//             onPress={() => likeEvent(props.user, props.x)}
//           />

//     )
// }




function CardEvenement(props){

  // console.log ('props =', props)
  // console.log ('props.event =', props.event)
  
  const [eventChoix, setEventChoix] = useState(null);
  const [clickEvent, setClickEvent] = useState(false);

  const [likeEventState,setLikeEventState ] = useState ( '#FFFFFF' );
  // const [likeEventContourState,s etLikeEventContourState ] = useState ( '#D70026' );

  //   function isUserLikedEvent (u, popularite){
//     console.log('isUserLikedEvent; popularite=', popularite);
//     var result = false;
//     if (u){
//       var i=0;
//       while ( !result &&  i < popularite.length){
//         if (u == popularite[i]){
//           result = true;
//           console.log('User liked, index = ', i);
//         }
//         i++;
//       }
//     }
//     console.log('result=', result);
//     if ( result ){
//       return  i-1;
//     }
//     return -1;
//   }

  // useEffect( ()=>{
  //   const upStateHeart = ()=> {
  //     setLikeEventState((props.user && props.event.popularite && isUserLikedEvent(props.user._id, props.event.popularite) !== -1 ) ? '#D70026' : '#FFFFFF')
  //   }
  //   upStateHeart();
  // }, [props.user])



  if (clickEvent){
    console.log('clickEvent');
    console.log('event=', props.event);
    props.newEvent(props.event);
    // setClickEvent(false);
    return(
      <Redirect to='Evenement' />
    )
  }else{

  var description;
  if ( props.event.description.length < 70 ){
    description = props.event.description;
  } else {
    description = props.event.description.substring(0,69)+'...';
  }

  
  return(

  <Col xs="12" sm="6" md="4" lg="4" xl="3" >
  <Card 
    // className='cadEventInEvenement'
    style={props.sizeCard}
    cover={
      <img
      style={props.sizeImg}
      alt={props.event.nom}
      src={props.event.image}
      />
    }
    onClick={ ()=>{setEventChoix(props.event); setClickEvent(true)}}
  >

    <Meta
      style={{
        textAlign: 'center', 
        padding: 5, 
        fontWeight: 'bold', 
        // textTransform: 'uppercase' 
      }}
      title = {props.event.nom}
      description = { `${description}`}
    >
      <div style={{ alignItems: 'center', margin: 2 }}>
      </div>
    </Meta>
  </Card>
  <FontAwesomeIcon icon={faHeart}
    style={props.styleHeartFond}
    color='#D70026'
    
    />
  <FontAwesomeIcon icon={faHeart}
    // style={{position: 'inherit'}}
    // className='heartLike'
    style={props.styleHeart}
    color={ likeEventState } 
    // color={ (props.user && isUserLikedEvent(props.user._id, props.x.popularite) ) ? '#D70026' : '#FFFFFF' } 
    // onPress={() => likeEvent(props.user, props.x)}
  />
  </Col>


  )
    }
};



function mapDispatchToProps(dispatch) {
  return {
    newEvent: function (evenement) {
      dispatch({ type: 'evenement', evenement: evenement });
    },
  }
}

function mapStateToProps(state) {
  return {
    user : state.userReducer,
    currentCity: state.currentCityReducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEvenement);