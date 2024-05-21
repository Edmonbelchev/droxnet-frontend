const isAuthenticated = async () => {
    const authStore = useAuthStore()

    let isAuthenticated = authStore.loggedIn

    if(!isAuthenticated) {
        // Try to authenticate
        await authStore.authenticated().then(() => {
            isAuthenticated = authStore.loggedIn
        })
    }

    return isAuthenticated
}

export default isAuthenticated