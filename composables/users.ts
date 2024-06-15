const fetchUser = async (userID: number) => {
    let { data, status, error }: any = await dataFetch("/user", {
        params: {
            user_id: userID,
        },
    });

    return { data, status, error };
};
export { fetchUser }