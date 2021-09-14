import React from 'react';
import { withRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class AuthVerify extends React.Component{
    constructor(props){
        super(props);

        props.history.listen(() => {
            const user = JSON.parse(localStorage.getItem('userToken'));
            if(user){
                const decodedJWT = jwt_decode(user);
                if(decodedJWT.exp * 1000 < Date.now()) {
                    props.logOut();
                }

                
            }
        })

    }



    render() {
        return <div></div>;
      }
}

export default withRouter(AuthVerify);