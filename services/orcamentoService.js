import createAxiosInstance from "~/composables/useApi.js";

export const getOrcamentoById = async (orcamentoId) => {
    const axios = await createAxiosInstance();

    return await axios.get(`/orcamentos/${orcamentoId}`)
    .then(({data}) => {
        console.log(data)
        return {success: true, data};
    })
    .catch((error) => {
        return {success: false, msg: error.message};
    });
}

export const getAllOrcamentos = async () => {
    const axios = await createAxiosInstance();

    return await axios.get(`/orcamentos/`)
        .then(({data}) => {
            console.log(data)
            return {success: true, data};
        })
        .catch((error) => {
            return {success: false, msg: error.message};
        });
}

export const createOrcamento = async (formData) => {
    const axios = await createAxiosInstance();
    console.log(`FormData: ${formData.convenio}`)
    const orcamento = {
        nomeSolicitante: formData.solicitante,
        nomePaciente: formData.paciente,
        email: formData.email,
        telefone: formData.telefone,
        convenio: formData.convenio,
        observacoes: formData.observacoes,
    }

    return await axios.post('/orcamentos/solicitar', orcamento)
    .then(({data}) => {
        return {success: true};
    })
    .catch((error) => {
        return {success: false};
    });
}

export const updateOrcamento = async (formData) => {
    const axios = await createAxiosInstance();

    console.log(`FormData: ${formData.nomeSolicitante}`)
    const orcamento = {
        nomeSolicitante: formData.nomeSolicitante,
        nomePaciente: formData.nomePaciente,
        email: formData.email,
        telefone: formData.telefone,
        convenio: formData.convenio.id,
        observacoes: formData.observacoes,
    }

    return await axios.patch(`/orcamentos/${formData.id}`, orcamento)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}

export const deleteOrcamento = async (orcamentoId) => {
    const axios = await createAxiosInstance();

    return await axios.delete(`/orcamentos/${orcamentoId}`)
        .then(({data}) => {
            return {success: true};
        })
        .catch((error) => {
            return {success: false};
        });
}