import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({loadingText}) => {

    const [displayedText, setDisplayedText] = useState("");
    useEffect(()=>{
        const textLength = loadingText.length;
        let currentIndex = 0;

        const interval = setInterval(()=>{
            if(currentIndex < textLength){
                setDisplayedText(loadingText.slice(0,currentIndex+1));
                currentIndex++;
            }else{
                setDisplayedText("");currentIndex=0;
            }
        },150);
        return ()=>{
            clearInterval(interval);
        };
    },[loadingText]);

    const spinnerStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#3498db",
        textTransform: "uppercase",
    };
  return (
    <>
    <Spinner
        style={{
            ...spinnerStyle,
            transform: "none",
            marginTop: "40px",
            fontSize: "24px"
        }}
        animation='border'
    />
    <div style={spinnerStyle}>
        <p style={{
            fontSize:"60px"
        }}>
            {displayedText}
        </p>
    </div>
    </>
  );
};

export default LoadingSpinner;