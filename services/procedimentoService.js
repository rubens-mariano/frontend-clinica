import createAxiosInstance from "~/composables/useApi.js";

export const getProcedimentoById = async (procedimentoId) => {
    const axios = await createAxiosInstance();

    return await axios.get(`/procedimentos/${procedimentoId}`)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAllProcedimentos = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/procedimentos/`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const createProcedimento = async (formData) => {
    const axios = await createAxiosInstance();
    console.log(`FormData: ${formData}`)
    const procedimento = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.usuario
    }

    return await axios.post('/procedimentos', procedimento)
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const updateProcedimento = async (formData) => {
    const axios = await createAxiosInstance();

    console.log(`FormData: ${formData.user}`)
    const procedimento = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.user
    }

    return await axios.patch(`/procedimentos/${formData.id}`, procedimento)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}

export const deleteProcedimento = async (procedimentoId) => {
    const axios = await createAxiosInstance();

    return await axios.delete(`/procedimentos/${procedimentoId}`)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}