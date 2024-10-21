const fetchConversations = async (perPage: number, page: number) => {
    const { data, error, status } = await dataFetch('/conversations', {
        params: {
            perPage: perPage,
            page: page
        }
    })
    
    return { data, error, status }
}

const fetchConversation = async (id: string) => {
    const { data, error, status } = await dataFetch(`/conversations/${id}`)

    return { data, error, status }
}

export {
    fetchConversations,
    fetchConversation
}