const getStripeAccountLink = async () => {
  const { data, status, error } = await dataFetch('/stripe/account-link')

  return { data, status, error }
}

const configurePayouts = async (interval: 'daily' | 'weekly' | 'monthly') => {
  const { data, status, error } = await dataFetch("/payouts/configure", {
    method: "POST",
    body: { interval },
  });

  return { data, status, error };
}

const getEarningsReport = async (startDate: string, endDate: string) => {
  const { data, status, error } = await dataFetch("/payouts/earnings", {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });

  return { data, status, error }
}

const addPaymentMethods = async (paymentMethodId: string) => {
  const { data, status, error } = await dataFetch("/payment-methods", {
    method: "POST",
    body: { payment_method_id: paymentMethodId },
  });

  return { data, status, error }
}

const getPaymentMethods = async () => {
  const { data, status, error } = await dataFetch('/payment-methods')

  return { data, status, error }
}

const createDeposit = async (amount: number, paymentMethodId: string) => {
  const { data, status, error } = await dataFetch('/deposit', {
    method: 'POST',
    body: {
      amount,
      payment_method_id: paymentMethodId
    }
  })

  return { data, status, error }
}

export {
  getStripeAccountLink,
  configurePayouts,
  getEarningsReport,
  addPaymentMethods,
  getPaymentMethods,
  createDeposit
}
