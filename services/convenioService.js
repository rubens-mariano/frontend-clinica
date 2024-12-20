import createAxiosInstance from "~/composables/useApi.js";

export const getConvenioById = async (convenioId) => {
    const axios = await createAxiosInstance();

    return await axios.get(`/convenios/${convenioId}`)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAllConvenios = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/convenios/`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const createConvenio = async (formData) => {
    const axios = await createAxiosInstance();
    console.log(`FormData: ${formData}`)
    const convenio = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.usuario
    }

    return await axios.post('/convenios', convenio)
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const updateConvenio = async (formData) => {
    const axios = await createAxiosInstance();

    console.log(`FormData: ${formData.user}`)
    const convenio = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.user
    }

    return await axios.patch(`/convenios/${formData.id}`, convenio)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}

export const deleteConvenio = async (convenioId) => {
    const axios = await createAxiosInstance();

    return await axios.delete(`/medicos/${convenioId}`)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}