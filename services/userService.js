import createAxiosInstance from "~/composables/useApi.js";

export const getUserData = async (userId) => {
    const axios = await createAxiosInstance();

    return await axios.get('/users/'+userId)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getUsersData = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/users`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const login = async () => {
    const axios = await createAxiosInstance();

    return await axios.post('/auth/login')
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const logout = async () => {
    const axios = await createAxiosInstance();

    return await axios.post('/auth/logout')
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}


export const sendResetPassword = async (email) => {
    const axios = await createAxiosInstance();

    return await axios.post('/auth/send-email-password', {email})
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const resetPassword = async (email, password, user) => {
    const axios = await createAxiosInstance();

    return await axios.post('/auth/reset-password', {email, password, user})
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const verifyCode = async (email, code) => {
    const axios = await createAxiosInstance();

    return await axios.post('/auth/verify-token', {email, token: code})
    .then(({data}) => {
        return {success: true, user: data.data.session};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAdressInformation = async (cep) => {
    const axios = await createAxiosInstance();

    return await axios.get('https://viacep.com.br/ws/'+cep+'/json/')
    .then(({data}) => {
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}