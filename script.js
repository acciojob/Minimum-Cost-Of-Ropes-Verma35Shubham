function calculateMinCost() {
	
	// const input = document.getElementById("rope-lengths").value;
	// const ropeLengths = input.split(",").map((length) => parseInt(length));

	// ropeLengths.sort((a, b) => a - b);

	// let minCost = 0;
	// let totalCost = 0;

	// while (ropeLengths.length > 1) {
	// 	const shortestRope1 = ropeLengths.shift();
	// 	const shortestRope2 = ropeLengths.shift();

	// 	const cost = shortestRope1 + shortestRope2;

	// 	minCost += cost;
	// 	totalCost += cost;

	// 	ropeLengths.push(cost);

	// 	ropeLengths.sort((a, b) => a - b);
	// }

	// const resultDiv = document.getElementById("result");
	// resultDiv.innerHTML = `The minimum cost of connecting the ropes is ${minCost}.`;

	var inputData = document.querySelector("#rope-lengths").value;
	var inputArr = inputData.split(",");

	for(var i = 0; i< inputArr.length; i++) {
		inputArr[i] = Number(inputArr[i]);
	}
	var cost = 0;
	inputArr.sort(function (a,b) { return a-b;});

	while(inputArr.length > 1) {
		var newRope = inputArr[0] + inputArr[1];
		cost += newRope;

		// delete first two element
		inputArr.splice(0,2);
		inputArr.push(newRope);
		//alert(newRope);
		inputArr.sort(function(a,b) { return a-b});
	}	
  document.querySelector("#result").textContent = cost;
	
}  