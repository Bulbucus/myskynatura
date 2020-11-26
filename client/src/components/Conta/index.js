import { useEffect } from "react";

import {connect} from 'react-redux';

const Conta = (props) => {

    useEffect(() => {
        fetch('http://localhost:8888/user/getUser', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            credentials: 'include',
            body: JSON.stringify({
                id:props.user.id,
                token:props.user.token
            })
        }).then(data => data.json()).then(respond => {
            console.log(respond)
        })
    },[props.user.id, props.user.token])

    return (
        <div style={{backgroundColor:"red"}}>
            <p>Conta</p>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Conta);