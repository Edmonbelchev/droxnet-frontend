const fetchMessages = async (perPage: number, page: number, conversationId: string) => {
    const { data, error, status } = await dataFetch('/messages', {
        params: {
            perPage: perPage,
            page: page,
            conversation_id: conversationId
        }
    })

    return { data, error, status }
}

const sendMessage = async (formData: FormData) => {
    const { data, error, status } = await dataFetch('/messages', {
        method: 'POST',
        body: formData
    })

    return { data, error, status }
}

export {
    fetchMessages,
    sendMessage
}