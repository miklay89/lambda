// url: https://nt0w3gaf7k.execute-api.eu-west-2.amazonaws.com/default/myFibFunction
// method: any
exports.handler = async (event) => {
  function fibGen(number) {
      let resultArr = [];
      let n1 = 0, n2 = 1, nextTerm;
      
      for (let i = 1; i <= number; i++) {
          resultArr.push(n1);
          nextTerm = n1 + n2;
          n1 = n2;
          n2 = nextTerm;
      }
      return resultArr;
  }
 


  const response = {
      statusCode: 200,
      body: JSON.stringify(`Fibonacci Series: ${fibGen(10)}`),
  };
  return response;
};