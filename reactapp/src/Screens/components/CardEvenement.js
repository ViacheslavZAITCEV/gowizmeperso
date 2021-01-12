import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";

import {Card} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import {Container, Row, Col} from 'reactstrap'

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

  return(

  <Col xs="12" sm="6" md="4" lg="2" xl="1" style={{position: 'relative'}} >
  <Card 
  // key={i}
  // containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '47%', backgroundColor: '#F8F5F2' }}
    style={{position: 'relative',  width: 220, height: 330 }}
    cover={
      <img
      alt={props.event.nom}
      src={props.event.image}
      />
    }
    onClick={ ()=>{setEventChoix(props.event); setClickEvent(true)}}
  >

      {/* <Heart
        size={25}
        token={props.token}      
        i={i}
        x={x}
        user={user}
        style={{ position: 'absolute', top: 5, left: 140 }}
        navigation={props.navigation}
      /> */}

    <Meta
      style={{ textAlign: 'center', fontWeight: 'bold', padding: 5, textTransform: 'uppercase' }}
      title = {props.event.nom}
      description = 'Une ville 200m.'
    >
      <div style={{ alignItems: 'center', margin: 2 }}>
        {/* <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value={props.event.categories[0]} /> */}
      </div>
    </Meta>
  </Card>
  <FontAwesomeIcon icon={faHeart}
    // style={{position: 'inherit'}}
    style={{position: 'relative', top: -320, left: 170, width: 20, height: 20 }}
    color='#D70026'

  />
  <FontAwesomeIcon icon={faHeart}
    // style={{position: 'inherit'}}
    style={{position: 'relative', top: -322, left: 152 }}
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