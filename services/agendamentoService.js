import createAxiosInstance from "~/composables/useApi.js";

export const getAgendamentoById = async (agendamentoId) => {
    const axios = await createAxiosInstance();

    return await axios.get(`/consultas/${agendamentoId}`)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAgendamentoByUserId = async (userId) => {
    const axios = await createAxiosInstance();
    console.log(`UserId: ${userId}`)
    return await axios.get(`/consultas/user/${userId}`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const getAllAgendamentos = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/consultas/`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const createAgendamento = async (formData) => {
    const axios = await createAxiosInstance();
    console.log(`FormData: ${formData.procedimento}`)
    const agendamento = {
        procedimento: formData.procedimento,
        data: formData.data,
        hora: formData.hora
    }

    return await axios.post('/consultas/agendar', agendamento)
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const updateAgendamento = async (formData) => {
    const axios = await createAxiosInstance();

    console.log(`FormData: ${formData.medico.id} ${formData.procedimento.id} ${formData.data} ${formData.hora} ${formData.id}`)
    const agendamento = {
        procedimento: formData.procedimento.id,
        data: formData.data,
        hora: formData.hora,
        medico: formData.medico.id,
    }

    return await axios.patch(`/consultas/${formData.id}`, agendamento)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}

export const deleteAgendamento = async (agendamentoId) => {
    const axios = await createAxiosInstance();

    return await axios.delete(`/consultas/${agendamentoId}`)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}