export const getPriceFromId = (binId: number, binStep: number): number => {
  return (1 + binStep / 10_000) ** (binId - 8388608);
};

export const getIdFromPrice = (price: number, binStep: number): number => {
  return Math.trunc(Math.log(price) / Math.log(1 + binStep / 10_000)) + 8388608;
};

export const distributeAndAdjust = (amount: number, number: number) => {
  const equalShare = amount / number;
  const array = Array(number).fill(equalShare.toString());
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  if (sum > amount) {
    const difference = sum - amount;
    array[array.length - 1] -= difference;
  } else if (sum < amount) {
    const difference = amount - sum;
    array[array.length - 1] += difference;
  }
  console.log(array, "arrat");
  return array;
};

export const generateDeltaIds = (
  minimumId: number,
  maximumId: number,
  activeId: number,
  tokenXAmount: number,
  tokenYAmount: number
) => {
  var diffX = minimumId - activeId;
  var diffY = maximumId - activeId;

  var deltaIds = [];
  var deltaIdX = [];
  var deltaIdY = [];
  var distributionX: any[] = [];
  var distributionY: any[] = [];
  if (activeId > maximumId) {
    var diffX = minimumId - maximumId;
    //deltaIds.push(0);
    deltaIdY.push("0");
    for (var i = diffX + 1; i <= 0; i++) {
      distributionY = distributionY.concat("0");
    }
    distributionY = distributionY.concat(
      getDistribution(tokenYAmount, deltaIdY.length)
    );
    for (var i = diffX; i <= 0; i++) {
      console.log("x", i);
      deltaIdX.push(i.toString());
      deltaIds.push(i.toString());
    }

    distributionX = distributionX.concat(
      getDistribution(tokenXAmount, deltaIdX.length)
    );
  } else if (activeId <= minimumId) {
    var diffY = maximumId - minimumId;
    console.log(diffX);

    deltaIds.push("0");
    deltaIdX.push("0");
    distributionX = distributionX.concat(
      getDistribution(tokenXAmount, deltaIdX.length)
    );

    for (var j = 1; j <= diffY; j++) {
      deltaIdY.push(j.toString());
      deltaIds.push(j.toString());
      distributionX = distributionX.concat("0");
    }
    distributionY = distributionY.concat(
      getDistribution(tokenYAmount, deltaIdY.length + 1)
    );
  } else {
    for (var i = diffX; i <= 0; i++) {
      deltaIds.push(i.toString());
      deltaIdX.push(i.toString());
    }
    console.log("deltaIdX.length", deltaIdX.length);
    distributionX = distributionX.concat(
      getDistribution(tokenXAmount, deltaIdX.length)
    );
    for (var j = 1; j <= diffY; j++) {
      console.log("j", j);
      distributionX.push("0");
    }

    for (var j = 1; j <= diffY; j++) {
      console.log("j", j);
      deltaIds.push(j.toString());
      deltaIdY.push(j.toString());
    }
    for (var i = diffX + 1; i <= 0; i++) {
      distributionY.push("0");
    }
    distributionY = distributionY.concat(
      getDistribution(tokenYAmount, deltaIdY.length + 1)
    );
  }

  return { deltaIds, distributionX, distributionY };
};

/*export const getDistribution = (amount: number, number: number) => {
  const equalShare = amount / number;
  const array = Array(number).fill(equalShare.toString());
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  if (sum > amount) {
    const difference = sum - amount;
    array[array.length - 1] -= difference;
  } else if (sum < amount) {
    const difference = amount - sum;
    array[array.length - 1] += difference;
  }
  console.log(array, "arrat");
  return array;
};*/

function getDistribution(number: number, parts: number) {
  const result = [];
  const quotient = Math.floor(number / parts);
  const remainder = number % parts;

  for (let i = 0; i < parts; i++) {
    if (i < remainder) {
      result.push(String(quotient + 1));
    } else {
      result.push(String(quotient));
    }
  }
  console.log("result", result);

  return result;
}

export function getBorrowRange(minimumId: number, maximumId: number) {
  const idArray = [];

  for (let i = minimumId; i <= maximumId; i++) {
    idArray.push(i);
  }

  return idArray;
}
