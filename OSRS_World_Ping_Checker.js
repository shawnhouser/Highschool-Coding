const request_main = require('request');
const ping = require('ping');

run();

async function getWorldData(){
	const url = 'http://oldschool.runescape.com/slu';
	const body = await request(url);
	const start = body.indexOf("<tbody class='server-list__body'>") + 34;
	const end   = body.indexOf('</tbody>');
	const short = body.substring(start, end);
	const shorten_line = /<td.*?>(?:\n *<a.*?>[A-z ]+(.*?)<\/a>.*?|(.*?))<\/td>/gs;
	const remove_garbage = /[ ]+(?:<tr.*?>\n|<\/tr>\n|(\d+) players|([\-A-z0-9 ]+))/g;
	const line_broke = short.replace(shorten_line, '$1$2').replace(remove_garbage, '$1$2');
	const match_regex = /(\d+)\n(\d+)\n([A-z ]+)\n([\-A-z0-9 ]+)\n([\-A-z0-9 ',]+)/g;
	const matches = line_broke.match(match_regex).map(e=>e.split('\n'));
	const advanced_worlds = matches.map(world =>{
		const new_world = {};
		new_world.world_id = parseInt(world[0]);
		new_world.players = parseInt(world[1]);
		new_world.region = world[2].replace(' ', '_');
		new_world.members = (world[3] == 'Members').toString();
		new_world.dangerous = world[4].includes('PvP').toString();
		new_world.tournament = (world[4] == 'Tournament World' || world[4] == 'Private Practice World').toString();
		new_world.deadman = world[4].includes('Deadman').toString();
		new_world.sdeadman = 'false'; //world[4].includes('deadman').toString();
		const level_regex = /(\d+) skill total/;
		new_world.level_requirement = level_regex.test(world[4]) ? parseInt(world[4].match(level_regex)[1]) : 0;
		if(/Wilderness PK - (Free|Members)/.test(world[4])){
			new_world.info = 'Wilderness PK';
		} else if(/Trade - (Free|Members)/.test(world[4])){
			new_world.info = 'Trade';
		} else if(/PvP World - Free/.test(world[4])){
			new_world.info = 'PvP World';
		} else if(/Castle Wars .*/.test(world[4])){
			new_world.info = 'Castle Wars';
		} else if(world[4] != '-'){
			new_world.info = world[4];
		} else {
			new_world.info = '';
		}
		return new_world;
	});
	return advanced_worlds;
}

function request(url) {
	return new Promise(function (resolve, reject) {
		request_main(url, function (error, res, body) {
			if (!error && res.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}

async function sleep(time_ms){
	return new Promise(function(resolve, reject){
		setTimeout(() => resolve(), time_ms);
	});
}

async function add_ping(world_data) {
	const url = "oldschool"+world_data.world_id+".runescape.com";
	const ping_data = await ping.promise.probe(url);
	if(ping_data.time == 'unkown'){ ping_data.time = 1000;}
	world_data.ping = Math.floor(ping_data.time);
	return;
}

async function add_ping_all(worlds){
	const world_promise = [];
	let counter = 1;
	process.stdout.write('Progress: 0 / '+worlds.length);
	for(let world of worlds){
		world_promise.push(add_ping(world));
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write('Progress: '+counter+' / '+worlds.length);
		if(counter++ % Math.floor(worlds.length / 30) == 0){ process.stdout.write('█'); }
		await sleep(100);
	}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log('Progress: '+worlds.length+' / '+worlds.length+' - Done');
	return Promise.all(world_promise);
}

async function get_world_strings(worlds){
	await add_ping_all(worlds);
	const sorted_worlds = worlds.sort((a,b)=>{
		const ping_comp = a.ping - b.ping;
		const player_comp = a.players - b.players;
		const world_comp = a.world_id - b.world_id;
		if(ping_comp != 0){ return ping_comp; }
		if(player_comp != 0){ return player_comp; }
		return world_comp;
	});

	const retarray = [];
	for(let world of sorted_worlds){
		let outputString = "World "+(300+world.world_id)+" has a ping of "+world.ping+"ms and "+world.players+" players.";
		if(world.members == 'false')   { outputString += ' This is a f2p world.'; }
		if(world.info != ''){ outputString += ' '+world.info; }
		retarray.push(outputString);
	}
	return retarray;
}

const all_filter = {
	members:['true','false'],
	dangerous:['true','false'],
	tournament:['true','false'],
	regions:['Germany','Australia','United_States','United_Kingdom'],
	deadman:['true','false'],
	sdeadman:['true','false'],
	minplayers: 0,
	maxplayers: 2000,
	minlevel: 0,
	maxlevel: 3000,
	count: 1000
};

async function run(){
	const all_worlds = await getWorldData();
	const args = process.argv;
	let filter = {
		members:['true'],
		dangerous:['false'],
		tournament:['false'],
		regions:['United_States'],
		deadman:['false'],
		sdeadman:['false'],
		minplayers: 0,
		maxplayers: 2000,
		minlevel: 0,
		maxlevel: 1760,
		count: 20
	};

	for(let arg of args){
		const i = arg.indexOf('=');
		if(i == -1){ continue; }
		const before = arg.substring(0, i);
		const after = arg.substring(i+1);
		switch(before){
			case 'deadman':
			case 'members':
			case 'regions':
			case 'sdeadman':
			case 'dangerous':
			case 'tournament': filter[before] = after.split(','); break;
			case 'count':
			case 'minlevel':
			case 'maxlevel':
			case 'minplayers':
			case 'maxplayers': filter[before] = parseInt(after); break;
		}
	}
	if(args.includes('allworlds')){ filter = all_filter; }
	let quiet_flag = args.includes('quiet_flag');

	const filtered_worlds = all_worlds.filter(e=>
		filter.members.includes(e.members) &&
		filter.dangerous.includes(e.dangerous) &&
		filter.tournament.includes(e.tournament) &&
		filter.regions.includes(e.region) &&
		filter.deadman.includes(e.deadman) &&
		filter.sdeadman.includes(e.sdeadman) &&
		filter.minplayers <= e.players &&
		e.players <= filter.maxplayers &&
		filter.minlevel <= e.level_requirement &&
		e.level_requirement <= filter.maxlevel
	);

	const output = await get_world_strings(filtered_worlds);
	const final_worlds = output.slice(0, filter.count);
	console.log(final_worlds.join('\n'));
}
