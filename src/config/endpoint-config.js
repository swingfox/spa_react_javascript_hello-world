const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;


const AppUrl = {
    paymentUrl : `${apiServerUrl}/payment`,
    publicUrl : `${apiServerUrl}/messages/public`,
    protectedUrl : `${apiServerUrl}/messages/protected`,
    adminUrl: `${apiServerUrl}/messages/admin`
}

export default AppUrl;