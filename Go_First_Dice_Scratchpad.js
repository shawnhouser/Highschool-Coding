const valid = [
	[1, 8, 11, 14, 19, 22, 27, 30, 35, 38, 41, 48],
	[2, 7, 10, 15, 18, 23, 26, 31, 34, 39, 42, 47],
	[3, 6, 12, 13, 17, 24, 25, 32, 36, 37, 43, 46],
	[4, 5, 9,  16, 20, 21, 28, 29, 33, 40, 44, 45]
];

const valid2 = [
	[1, 5, 10, 11, 13, 17],
	[3, 4, 7,  12, 15, 16],
	[2, 6, 8,  9,  14, 18]
];

const working = [
	[[1,5,9,12,14,16],	[2,6,7,11,13,18],	[3,4,8,10,15,17]],
	[[1,6,9,10,15,16],	[2,5,7,12,14,17],	[3,4,8,11,13,18]],
	[[1,6,9,10,15,16],	[2,5,8,11,13,18],	[3,4,7,12,14,17]],
	[[1,6,8,11,15,16],	[2,5,7,12,14,17],	[3,4,9,10,13,18]],
	[[1,6,8,11,15,16],	[2,5,9,10,13,18],	[3,4,7,12,14,17]],
	[[1,5,10,11,13,17],	[2,6,8,9,14,18],	[3,4,7,12,15,16]],
	[[1,6,8,12,13,17],	[2,4,9,11,15,16],	[3,5,7,10,14,18]],
	[[1,6,9,10,14,17],	[2,5,7,12,15,16],	[3,4,8,11,13,18]],
	[[1,6,9,10,14,17],	[2,5,8,11,13,18],	[3,4,7,12,15,16]],
	[[1,6,8,11,14,17],	[2,5,7,12,15,16],	[3,4,9,10,13,18]],
	[[1,6,8,11,14,17],	[2,5,9,10,13,18],	[3,4,7,12,15,16]]
]

working.forEach(e =>{
	//if(array_includes(working, simplify(inverse(e)))){ return; }
	console.log(niceify(toTypes(e))+"\n")
	//console.log(niceify(e)); console.log()
});
console.log(getSizeOfPF(3, 6))
/*
const valid3_cache = getAllPermute(seq(0, 5), 3);
//console.log(optimized_isValid3(valid2))
function optimized_rank3(array){
	     if(array[0] < array[1] && array[1] < array[2] ){ return "123"}
	else if(array[0] < array[2] && array[2] < array[1] ){ return "132"}
	else if(array[1] < array[0] && array[0] < array[2] ){ return "213"}
	else if(array[1] < array[2] && array[2] < array[0] ){ return "231"}
	else if(array[2] < array[0] && array[0] < array[1] ){ return "312"}
	else if(array[2] < array[1] && array[1] < array[0] ){ return "321"}
	else { return "aaa"}
}

function optimized_isValid3(diceArray){
	const permCount = {};
	for(let perm of valid3_cache){
		const places = cross(diceArray, perm);
		const rankString = optimized_rank3(places)
		permCount[rankString] = permCount[rankString] + 1 || 1;
	}
	return checkPerms(permCount);
}

//console.log(toTypes(valid))
//console.log(all_set_combination([1,2,3,4], 3));
console.log(getSizeOfPF(3,6))
makeAllUnique(3,6).forEach((e,i,a) => {
	if(i % 10000 == 0){ console.log((new Date())+" #"+i)}
	if(!optimized_isValid3(e)){ return; }
	console.log(e);
	console.log();
}) */

function makeAllUnique(players, faces){
	const arr = seq(1, players*faces);
	return recursive(arr, faces);

	function recursive(available, choiceCount){
		if(available.length == 0){ return [[]]; }
		const min = Math.min(...available);
		const copy = available.filter(e => e != min);
		const rest = all_set_combination(copy, choiceCount-1).map(e=>{e.unshift(min); return e;})
		
		const results = [];
		for(let row of rest){
			const new_available = available.filter(e => !row.includes(e));
			const other_rows = recursive(new_available, choiceCount);
			other_rows.forEach(e => e.unshift(row))
			results.push(...other_rows);
		}
		return results;
	}
}

function seq(_start, _end, _step){
	const start = Math.min(_start, _end);
	const end   = Math.max(_start, _end);
	const step  = _step || 1;
	const seqarray = [];
	for(let i = start; i <= end; i+=step){
		seqarray.push(i);
	}
	const retarray = _start<_end ? seqarray : seqarray.reverse();
	return retarray;
}

const alltypes = [];
/*const thingagings = betterPermuteRow([1,2,3,4,5,6,7,8,9]).map(e=>{
	const a = toTwoDim(e, 3, 3);
	const c = simplify(a);
	if(!array_includes(alltypes, c)){
		alltypes.push(c);
	//	console.log(getPermCount(c));
		//console.log(niceify(c));
		//console.log("-----------------")
//		console.log(niceify(toTypes(c)));
//		console.log()
	}
	//const b = getPermCount(a);
//	return getPermCount(c);
	//return 
});
const yeahyeahyeah = {};
alltypes.forEach(e=>yeahyeahyeah[permCountToString(getPermCount(e))] = yeahyeahyeah[permCountToString(getPermCount(e))] || 1)
for(let id in yeahyeahyeah){
	if(yeahyeahyeah[id] > 1){ console.log(yeahyeahyeah[id] )}
}*/
/*alltypes.sort((a,b)=>{
	return permCountToString(getPermCount(a)).localeCompare(permCountToString(getPermCount(b)))
}).forEach(e=> console.log(niceify(toTypes(e))+"\n"+permCountToString(getPermCount(e))+"\n"))*/

function permCountToString(permcount){
	let retstring = "";
	for(let thing in permcount){
		retstring += thing + ":" + permcount[thing]+" ";
	}
	return retstring
}

/*for(let i = 2; i < 6; i++){
	for(let j = 2; j < 13;j++){
		console.log("Players: "+i+" Faces: "+j+"\t"+getSizeOfPF(i, j))
	}
} */

function getSizeOfPF(players, faces){
	let answer = 1;
	for(let i = 1; i <= players; i++){
		answer *= nchoosep(i*faces-1, faces-1);
	}
	return answer;
}

function nchoosep(n,p){
	return factorial(n)/(factorial(p)*factorial(n-p))
}

function toTypes(diceArray){
	const max = diceArray[0].length * diceArray.length + 1;
	return diceArray.map(r=>r.map(e=>{
		return max - e < Math.ceil(max/2) ? String.fromCharCode(96 + max-e)+2 : String.fromCharCode(96 + e)+1;
	}).sort((a,b)=>a.localeCompare(b)).sort((ra,rb)=>ra[0].localeCompare(rb[0])));
}

//console.log(getPermCount([[1,2,6],[3,4,5]]));
//console.log(getPermCount([[1,3,5],[2,4,6]]));

//console.log(getPermCount([[1,5,6],[2,3,4]]));
//console.log(getPermCount([[2,4,6],[1,3,5]]));

//console.log(group(thingagings));

let aasdasd = 0; // reverseable
alltypes.forEach(e=>{
//	const a = getPermCount(e);
//	const b = checkPerms(a);
//	const c = simplify(inverse(e)); //inverse
//	const d = simplify(inverse(c)); //orig
//	const backwards = array_eq(c,d);
//	const rev = array_eq(e,c);
//	const f = countConcurrent(e);
	/*console.log(niceify(e))
	console.log(backwards);
	console.log(niceify(c))
	console.log() */
//	if(f.length % 2 == 0 && f.some((e,i,a)=>e[1] != a[0][1])){
//		console.log(niceify(e)+"\n")
//	}
	//console.log(niceify(e)+"\n--------\n"+niceify(f));
	//console.log(array_eq(e,c));
	//console.log()
	/*if(!array_eq(e,c)){
		console.log(b);
		console.log(a)
		console.log(niceify(e)+"\n---------\n"+niceify(c)+"\n")
	}*/
});

//console.log(alltypes.length)

function countConcurrent(diceArray){
	let pairStarts = [];
	for(let rowId in diceArray){
		const row = diceArray[rowId];
		let lastelem = row[0];
		for(let i = 1; i < row.length; i++){
			if(row[i] == lastelem + 1){ pairStarts.push([rowId, i]); }
			lastelem = row[i];
		}
	}
	return pairStarts;
}

function array_includes(array, thing){
	for(let elem of array){
		if(array_eq(elem, thing)){ return true; }
	}
	return false;
}

function array_eq(x, y) {
	if(x.length != y.length){ return false; }
	for(let i = 0; i < x.length; i++){
		if(x[i].length != y[i].length){ return false; }
		for(let j = 0; j < x[0].length; j++){
			if(x[i][j] != y[i][j]){ return false; }
		}
	}
	return true;
}

function inverse(diceArray){
	const max = diceArray[0].length * diceArray.length + 1;
	return diceArray.map(r=>r.map(e=>max-e));
}

function simplify(diceArray){
	return diceArray.map(e=>e.sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]);
}

function toTwoDim(array, players, faces){
	const retarray = [...Array(players)].map(e => Array(faces));
	let counter = 0;
	for(let i = 0; i < players; i++){
		for(let j = 0; j < faces; j++){
			retarray[i][j] = array[counter++];
		}
	}
	return retarray;
}
function tranpose(twoDim){
	const retarray = [...Array(twoDim[0].length)].map(e => Array(twoDim.length));
	for(let i = 0; i < twoDim.length; i++){
		for(let j = 0; j < twoDim[0].length; j++){
			retarray[j][i] = twoDim[i][j];
		}
	}
	return retarray;
}
//console.log(allRowPermute(tranpose(makePF(2,2))));
//checkAllPermutationsOfPF(4,6);
function checkAllPermutationsOfPF(players, faces){
	const allPemutes = getAllColPermutations(makePF(players, faces));
	const total = allPemutes.length;
	console.log("calculated all "+total+" permutations");
	const counter = 0;
	for(let permutation of allPemutes){
		const valid = checkPerms(permutation);
		if(!valid){ continue; }
		niceify(permutation);
		console.log();
	}
}

//getAllRowPermutations(makePF(2,3)).forEach(e=>console.log(niceify(e)));
function getAllColPermutations(twoDimT){
	return allRowPermute_r(tranpose(twoDimT)).map(e=>tranpose(e)).reverse();
}
function allRowPermute_r(twoDimT){
	if(twoDimT.length == 0){ return [[]]; }
	const results = [];
	const copy = twoDimT.slice(); copy.splice(0,1);
	const thisRowsPerms = permuteRow(twoDimT[0]);
	const restRowPerms = allRowPermute_r(copy);
	for(let thisRowPerm of thisRowsPerms){
		for(let restRowPerm of restRowPerms){
			const thing = restRowPerm.slice();
			thing.unshift(thisRowPerm);
			results.push(thing);
		}
	}
	return results;
}

function niceify(twoDim){
	let retstr = "";
	for(let row of twoDim){
		retstr += "["+row.toString()+"]\n";
	}
	return retstr.slice(0, -1);
}

function betterPermuteRow(rest, current){
	current = current || [];
	if(rest.length == 0){ return [current]; }
	let results = [];
	for(let elemId in rest){
		const restCopy = rest.slice();
		const currentCopy = current.slice();

		restCopy.splice(elemId, 1);
		currentCopy.push(rest[elemId]);
		
		const response = betterPermuteRow(restCopy, currentCopy);
		for(let perm of response){
			results.push(perm);
		}
	}
	return results;
}

function permuteRow(array){
	if(array.length == 0){ return [[]]; }
	const results = [];
	for(let valueID in array){
		const copy = array.slice();
		copy.splice(valueID, 1);
		const response = permuteRow(copy);
		response.forEach(e=>e.push(array[valueID]));
		results.push(...response);
	}
	return results;
}

function makePF(players, faces){
	/* makePF(3, 5)
	   [1,4,7,10,13]
	   [2,5,8,11,14]
	   [3,6,9,12,15] */
	const diceArray = [...Array(players)].map(e => Array(faces));
	let counter = 1;
	for(let i = 0; i < faces; i++){
		for(let j = 0; j < players; j++){
			diceArray[j][i] = counter++;
		}
	}
	return diceArray;
}

function getAllPermute(array, depth){
	/* [1,2,3] 2
	   [1,1] [2,1] [3,1]
	   [1,2] [2,2] [3,2]
	   [1,3] [2,3] [3,3]  */
	if(depth == 0){ return [[]]; }
	const results = [];
	for(let choice in array){
		const response = getAllPermute(array, depth-1);
		response.forEach(e=>e.unshift(array[choice]));
		results.push(...response)
	}
	return results;
}

function all_set_combination(array, depth){
	/* [1,2,3] 2
	   [1,1] [2,1] [3,1]
	   [1,2] [2,2] [3,2]
	   [1,3] [2,3] [3,3]  */
	if(depth == 0 ){ return [[]]; }
	const results = [];
	for(let choiceIndex in array){
		const copy = array.filter((e,i,a) => i < choiceIndex);
		const response = all_set_combination(copy, depth-1);
		response.forEach(e=>e.push(array[choiceIndex]));
		results.push(...response)
	}
	return results;
}

function cross(diceArray, selectionArray){
	/* [1,4,7,10,13]
	   [2,5,8,11,14] * [1,4,2] = [4,14,9]
	   [3,6,9,12,15]                      */
	return selectionArray.map((choice,player)=>diceArray[player][choice]);
}



function rank(array){
	const sorted = array.slice().sort((a,b)=>b-a);
	const ranks = array.slice().map(e=>sorted.indexOf(e)+1);
	return ranks;
}

function isValid(diceArray){
	return checkPerms(getPermCount(diceArray));
}

function checkPerms(permCount){
	const allEqual = Object.keys(permCount).every((e,i,a)=>permCount[e] == permCount[a[0]]);
	const allRepresented = Object.keys(permCount).length == factorial(Object.keys(permCount)[0].length)
	return allEqual && allRepresented;
}

function group(permCounts){
	const groups = {};
	for(let permCount of permCounts){
		let identifierString = ""
		for(let id in permCount){
			identifierString += id + "+"+permCount[id] + " ";
		}
		groups[identifierString] = groups[identifierString] + 1 || 1;
	}
	return groups;
}

function factorial(num){
    var rval = 1;
    for (var i = 2; i <= num; i++){
		rval *=  i;
	}
    return rval;
}

function getPermCount(diceArray){
	const permCount = {};
	const choiceArray = seq(0, diceArray[0].length-1);
	const perms = getAllPermute(choiceArray, diceArray.length);
	for(let permId in perms){
		const places = cross(diceArray, perms[permId]);
		const rankString = rank(places).reduce((a,b)=>a.toString()+b);
		permCount[rankString] = permCount[rankString] + 1 || 1;
	}
	return permCount;
}