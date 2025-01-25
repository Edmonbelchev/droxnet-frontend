const getWallet = async () => {
  const { data, status,error } = await dataFetch("/wallet");

  return { data, status, error }
};

const withdrawFromWallet = async (amount: number) => {
  const { data, status,error } = await dataFetch("/wallet/withdraw", {
    method: "POST",
    body: {
      amount,
    },
  });

  return { data, status, error }
};

const getTransactions = async (page = 1, perPage = 3) => {
  const { data, status,error } = await dataFetch("/wallet/transactions", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return { data, status, error }
};

export {
  getWallet,
  getTransactions,
  withdrawFromWallet
};
