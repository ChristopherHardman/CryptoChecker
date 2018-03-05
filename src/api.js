const api = {

  historicalData: async (currency) => {
    try {
      const currencyData = await
         fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=USD&limit=100`,  {
            method: 'GET'
            })
      return currencyData.json();
    }
    catch (error) {
      console.log('Error', error);
      return 'Error';
    }
  }

}

export default api;
