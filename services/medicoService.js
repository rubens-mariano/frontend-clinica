import createAxiosInstance from "~/composables/useApi.js";

export const getMedicoById = async (medicoId) => {
    const axios = await createAxiosInstance();

    return await axios.get(`/medicos/${medicoId}`)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAllMedicos = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/medicos/`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const createMedico = async (formData) => {
    const axios = await createAxiosInstance();
    console.log(`FormData: ${formData}`)
    const medico = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.usuario
    }

    return await axios.post('/medicos', medico)
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const updateMedico = async (formData) => {
    const axios = await createAxiosInstance();

    console.log(`FormData: ${formData.user}`)
    const medico = {
        name: formData.nome,
        crm: formData.crm,
        user: formData.user
    }

    return await axios.patch(`/medicos/${formData.id}`, medico)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}

export const deleteMedico = async (medicoId) => {
    const axios = await createAxiosInstance();

    return await axios.delete(`/medicos/${medicoId}`)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}