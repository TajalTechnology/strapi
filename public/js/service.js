export{Auth}

const Auth = {
    userData: null, 

    login: function(authInfo) {
        //console.log('the authInfo is ', authInfo)
        fetch('/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authInfo)
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('Well Done!')
            console.log('the response data is ', data)
            this.userData = data

            let event = new CustomEvent('userLogin')
            window.dispatchEvent(event)
        })
    }, 

    getJWT: function(){
        if (this.userData) {
            return this.userData.jwt
        } else {
            return null
        }
    },

    getUser: function(){
        if (this.userData) {
            return this.userData.user
        } else {
            return null
        }
    }


}