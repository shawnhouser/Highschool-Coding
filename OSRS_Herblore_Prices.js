const getItem = require("osrs-wrapper").ge.getItem;
const all_items = {};
// https://oldschool.runescape.wiki/w/Herblore#Potions
const potions = [
//	attack potion
//	['antipoison', 'marrentill', 'unicorn horn dust', 37.5],
//	relicym's balm
//	['strength potion', 'tarromin', 'limpwurt root', 50],
//	serum 207
//	guthix rest tea
//	guam tar
//	compost potion
//	['restore potion', 'harralander', 'red spiders\' eggs', 62.5],
//	guthix balance
//	blamish oil
//	['energy potion', 'harralander', 'chocolate dust', 67.5],
//	['defence potion', 'ranarr weed', 'white berries', 75],
//	marrentill tar
//	['agility potion', 'toadflax', 'toad\'s legs', 80],
//	['combat potion', 'harralander', 'goat horn dust', 84],
	['prayer potion(4)', ['ranarr potion (unf)', 'snape grass'], 87.5],
//	tarromin tar
//	harralander tar
	['super attack(4)', ['irit potion (unf)', 'eye of newt'], 100],
	['superantipoison(4)', ['irit potion (unf)', 'unicorn horn dust'], 106.3],
//	['fishing potion', 'avantoe', 'snape grass', 112.5],
	['super energy(4)', ['avantoe potion (unf)', 'mort myre fungus'], 117.5],
//	shrink me quick
//	hunter potion
	['super strength(4)', ['kwuarm potion (unf)', 'limpwurt root'], 125],
//	magic essence
//	weapon poison
	['super restore(4)', ['snapdragon potion (unf)', 'red spiders\' eggs'], 142.5],
//	sanfew serum
	['super defence(4)', ['cadantine potion (unf)', 'white berries'], 150],
//	antidote +
	['antifire potion(4)', ['lantadyme potion (unf)', 'dragon scale dust'], 157.5],
	['ranging potion(4)', ['dwarf weed potion (unf)', 'wine of zamorak'], 162.5],
//	weapon poison+
	['magic potion(4)', ['lantadyme potion (unf)', 'potato cactus'], 172.5],
	['stamina potion(4)', ['super energy(4)', 'amylase crystal', 'amylase crystal', 'amylase crystal', 'amylase crystal', ], 102],
	['zamorak brew(4)', ['torstol potion (unf)', 'jangerberries'], 175],
//	antidote++
//?	['bastion potion(4)', ['cadantine blood potion (unf)', 'wine of zamorak'], 155],
//?	['battlemage potion(4)', ['cadantine blood potion (unf)', 'potato cactus'], 155], 
	['saradomin brew(4)', ['toadflax potion (unf)', 'crushed nest'], 180],
//	weapon poison++
//?	['extended antifire(4)', ['antifire potion(4)', 'lava scale shard', 'lava scale shard', 'lava scale shard', 'lava scale shard'], 110],
	['anti-venom(4)', ['antidote++(4)', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales', 'zulrah\'s scales'], 120],
	['super combat potion(4)', ['torstol', 'super attack(4)', 'super strength(4)', 'super defence(4)'], 150],
//?	['super antifire potion(4)', ['antifire potion(4)', 'crushed superior dragon bones'], 130],
	['anti-venom+(4)', ['anti-venom(4)', 'torstol'], 125],
//?	['extended super antifire(4)', ['super antifire potion(4)', 'lava scale shard', 'lava scale shard', 'lava scale shard', 'lava scale shard'], 160]
]
doit()
async function doit(){
	for(let potion of potions){
		const gp_exp = await gp_exp_raw(...potion);
		console.log(potion[0].replace('(4)', '') +'\t'+gp_exp)
	}
}

async function gp_exp_raw(final_pot, costs, exp){
	const final_price = Math.floor((await getPrice(final_pot)) * (3/4));
	let total_cost = 0;
	for(let item of costs){
		total_cost += await getPrice(item);
	}
	return Math.floor(100 * (final_price - total_cost) / exp) / 100;
}

async function getPrice(itemId){
	if(all_items[itemId]){ return all_items[itemId]; }
	try{
		const json_string = await getItem(itemId);
		let price_string;
		try{
			price_string = JSON.parse(json_string).item.current.price;
		} catch(e){console.log(json_string)}
		if(typeof price_string == 'number'){
			all_items[itemId] = price_string;
			return price_string;
		} else {
			const regex = price_string.match(/^(\d+)[,.](\d+)([kbm]?)/);
			const mults = {'b':1000000000, 'm':1000000, 'k':1000}
			const mult = regex[3] ? mults[regex[3]] : 1000;
			const top = parseInt(regex[1]) * mult;
			const lower = parseInt(regex[2]) * mult / Math.pow(10, regex[2].length)
			all_items[itemId] = top + lower;
			return top + lower
		}
	} catch(e){ console.log(itemId+'\n'+e+'\n')}
}