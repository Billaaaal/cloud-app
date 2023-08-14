import React from 'react';
import styles from './sidePannelButton.module.css';
import Share from './Share.png'


//const SidePannelButton = (props: { icon:String ; text: String; }) => {


const SidePannelButton = (props:any) => {

    var bg: string;
    var bgHover: string;
    var buttonStyle: any;

    var item = props.itemObject




    if (item.title==="Dashboard"){
        
        buttonStyle = styles.sidePannelFirstButton

        bg = "#51459E"
        bgHover = "#3D347F"


    }else{

        buttonStyle = styles.sidePannelButton

        bg = "#ECEFF7"
        bgHover = "#c1d2ff"
            
    }
    
    return (

        

        <div className={styles.sidePannelButtonContainer}>

            

            <button className={buttonStyle}>

            
                <img className={styles.sidePannelButtonIcon} src={item.image}></img>

            </button>

            
            <h2 className={styles.sidePannelButtonTitle}>{item.title}</h2>


        </div>
    
    )
}



export default SidePannelButton;