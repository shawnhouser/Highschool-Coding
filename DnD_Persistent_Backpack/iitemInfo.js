// Calculates the Weight from stored calues and Displays it



/*		Bash script to format everything inside the switch but not the switch

#Declaring Important Things
declare -a material=("leather" "bronze" "brass" "gold" "iron" "steel" "mithril" "titanium" "adamant")
declare -a materialWeightValue=(20 34 45 30 40 38 25 55 70)
declare -a materialACValue=(10 20 28 33 40 60 65 100 140)
declare -a armor=("helmet" "cape" "necklace" "gauntlets" "platebody" "armguards" "ring" "bracelet" "platelegs" "boots" "shield")
declare -a armorWeightValue=(0.07 0.01 0.02 0.05 0.27 0.19 0.02 0.02 0.19 0.07 0.09)
declare -a armorACValue=(0.13 0.01 0.01 0.05 0.27 0.18 0.01 0.01 0.18 0.06 0.09)

weightValue=0
ACValue=0
z=0
y=0
#Gets the Length of the Strings
materialLength=${#material[@]}
armorLength=${#armor[@]}
echo -e '\t'"itemValue={"
while [ $z -lt ${materialLength} ] ; do
	#Don't let it keep adding. So it repeats again
	((y=0))
	while [ $y -lt ${armorLength} ] ; do
		#a=Row * ColumnNumber - In Floating Point and then out of Floating point
		#My One line wonder
		weightValue=$(echo "$(echo ${materialWeightValue[$z]}'*'${armorWeightValue[$y]} | bc -l)/1" | bc )
		ACValue=$(echo "$(echo ${materialACValue[$z]}'*'${armorACValue[$y]} | bc -l)/1" | bc )
		#echo it in the correct format
		# -e is to allow the \t to make a tab
		echo -e '\t\t"'${material[$z]}' '${armor[$y]}'":{"class":"armor", "weight":'$weightValue',"AC":'$ACValue'},'
		((y=y+1))
	done
	((z=z+1))
done
echo -e '\t'"};"

#Reads Out Like This
#	1	2	3
#	4	5	6
#	7	8	9
*/



	itemValue={
		"leather helmet":{"class":"armor", "weight":1,"AC":1},
		"leather cape":{"class":"armor", "weight":0,"AC":0},
		"leather gauntlets":{"class":"armor", "weight":1,"AC":0},
		"leather platebody":{"class":"armor", "weight":5,"AC":2},
		"leather armguards":{"class":"armor", "weight":3,"AC":1},
		"leather platelegs":{"class":"armor", "weight":3,"AC":1},
		"leather boots":{"class":"armor", "weight":1,"AC":0},
		"leather shield":{"class":"armor", "weight":1,"AC":0},
		"bronze helmet":{"class":"armor", "weight":2,"AC":2},
		"bronze chain helmet":{"class":"armor", "weight":1,"AC":1},
		"bronze cape":{"class":"armor", "weight":0,"AC":0},
		"bronze necklace":{"class":"armor", "weight":0,"AC":0},
		"bronze gauntlets":{"class":"armor", "weight":1,"AC":1},
		"bronze chain gauntlets":{"class":"armor", "weight":0,"AC":0},
		"bronze platebody":{"class":"armor", "weight":9,"AC":5},
		"bronze chain chestpiece":{"class":"armor", "weight":4,"AC":4},
		"bronze armguards":{"class":"armor", "weight":6,"AC":3},
		"bronze chain armguards":{"class":"armor", "weight":3,"AC":2},
		"bronze ring":{"class":"armor", "weight":0,"AC":0},
		"bronze bracelet":{"class":"armor", "weight":0,"AC":0},
		"bronze platelegs":{"class":"armor", "weight":6,"AC":3},
		"bronze chain pants":{"class":"armor", "weight":3,"AC":2},
		"bronze boots":{"class":"armor", "weight":2,"AC":1},
		"bronze shield":{"class":"armor", "weight":3,"AC":1},
		"brass helmet":{"class":"armor", "weight":3,"AC":3},
		"brass chain helmet":{"class":"armor", "weight":1,"AC":2},
		"brass cape":{"class":"armor", "weight":0,"AC":0},
		"brass necklace":{"class":"armor", "weight":0,"AC":0},
		"brass gauntlets":{"class":"armor", "weight":2,"AC":1},
		"brass chain gauntlets":{"class":"armor", "weight":1,"AC":1},
		"brass platebody":{"class":"armor", "weight":12,"AC":7},
		"brass chain chestpiece":{"class":"armor", "weight":6,"AC":5},
		"brass armguards":{"class":"armor", "weight":8,"AC":5},
		"brass chain armguards":{"class":"armor", "weight":4,"AC":3},
		"brass ring":{"class":"armor", "weight":0,"AC":0},
		"brass bracelet":{"class":"armor", "weight":0,"AC":0},
		"brass platelegs":{"class":"armor", "weight":8,"AC":5},
		"brass chain pants":{"class":"armor", "weight":4,"AC":3},
		"brass boots":{"class":"armor", "weight":3,"AC":1},
		"brass shield":{"class":"armor", "weight":4,"AC":2},
		"gold helmet":{"class":"armor", "weight":2,"AC":4},
		"gold chain helmet":{"class":"armor", "weight":1,"AC":3},
		"gold cape":{"class":"armor", "weight":0,"AC":0},
		"gold necklace":{"class":"armor", "weight":0,"AC":0},
		"gold gauntlets":{"class":"armor", "weight":1,"AC":1},
		"gold chain gauntlets":{"class":"armor", "weight":0,"AC":1},
		"gold platebody":{"class":"armor", "weight":8,"AC":8},
		"gold chain chestpiece":{"class":"armor", "weight":4,"AC":6},
		"gold armguards":{"class":"armor", "weight":5,"AC":5},
		"gold chain armguards":{"class":"armor", "weight":2,"AC":4},
		"gold ring":{"class":"armor", "weight":0,"AC":0},
		"gold bracelet":{"class":"armor", "weight":0,"AC":0},
		"gold platelegs":{"class":"armor", "weight":5,"AC":5},
		"gold chain pants":{"class":"armor", "weight":2,"AC":4},
		"gold boots":{"class":"armor", "weight":2,"AC":1},
		"gold shield":{"class":"armor", "weight":2,"AC":2},
		"iron helmet":{"class":"armor", "weight":2,"AC":5},
		"iron chain helmet":{"class":"armor", "weight":1,"AC":3},
		"iron cape":{"class":"armor", "weight":0,"AC":0},
		"iron necklace":{"class":"armor", "weight":0,"AC":0},
		"iron gauntlets":{"class":"armor", "weight":2,"AC":2},
		"iron chain gauntlets":{"class":"armor", "weight":1,"AC":1},
		"iron platebody":{"class":"armor", "weight":10,"AC":10},
		"iron chain chestpiece":{"class":"armor", "weight":5,"AC":8},
		"iron armguards":{"class":"armor", "weight":7,"AC":7},
		"iron chain armguards":{"class":"armor", "weight":3,"AC":5},
		"iron ring":{"class":"armor", "weight":0,"AC":0},
		"iron bracelet":{"class":"armor", "weight":0,"AC":0},
		"iron platelegs":{"class":"armor", "weight":7,"AC":7},
		"iron chain pants":{"class":"armor", "weight":3,"AC":5},
		"iron boots":{"class":"armor", "weight":2,"AC":2},
		"iron shield":{"class":"armor", "weight":3,"AC":3},
		"steel helmet":{"class":"armor", "weight":2,"AC":7},
		"steel chain helmet":{"class":"armor", "weight":1,"AC":5},
		"steel cape":{"class":"armor", "weight":0,"AC":0},
		"steel necklace":{"class":"armor", "weight":0,"AC":0},
		"steel gauntlets":{"class":"armor", "weight":1,"AC":3},
		"steel chain gauntlets":{"class":"armor", "weight":0,"AC":2},
		"steel platebody":{"class":"armor", "weight":10,"AC":16},
		"steel chain chestpiece":{"class":"armor", "weight":5,"AC":12},
		"steel armguards":{"class":"armor", "weight":7,"AC":10},
		"steel chain armguards":{"class":"armor", "weight":3,"AC":8},
		"steel ring":{"class":"armor", "weight":0,"AC":0},
		"steel bracelet":{"class":"armor", "weight":0,"AC":0},
		"steel platelegs":{"class":"armor", "weight":7,"AC":10},
		"steel chain pants":{"class":"armor", "weight":3,"AC":8},
		"steel boots":{"class":"armor", "weight":2,"AC":3},
		"steel shield":{"class":"armor", "weight":3,"AC":5},
		"mithril helmet":{"class":"armor", "weight":1,"AC":8},
		"mithril chain helmet":{"class":"armor", "weight":0,"AC":6},
		"mithril cape":{"class":"armor", "weight":0,"AC":0},
		"mithril necklace":{"class":"armor", "weight":0,"AC":0},
		"mithril gauntlets":{"class":"armor", "weight":1,"AC":3},
		"mithril chain gauntlets":{"class":"armor", "weight":0,"AC":2},
		"mithril platebody":{"class":"armor", "weight":6,"AC":17},
		"mithril chain chestpiece":{"class":"armor", "weight":3,"AC":13},
		"mithril armguards":{"class":"armor", "weight":4,"AC":11},
		"mithril chain armguards":{"class":"armor", "weight":2,"AC":8},
		"mithril ring":{"class":"armor", "weight":0,"AC":0},
		"mithril bracelet":{"class":"armor", "weight":0,"AC":0},
		"mithril platelegs":{"class":"armor", "weight":4,"AC":11},
		"mithril chain pants":{"class":"armor", "weight":2,"AC":8},
		"mithril boots":{"class":"armor", "weight":1,"AC":3},
		"mithril shield":{"class":"armor", "weight":2,"AC":5},
		"titanium helmet":{"class":"armor", "weight":3,"AC":13},
		"titanium chain helmet":{"class":"armor", "weight":1,"AC":9},
		"titanium cape":{"class":"armor", "weight":0,"AC":1},
		"titanium necklace":{"class":"armor", "weight":1,"AC":1},
		"titanium gauntlets":{"class":"armor", "weight":2,"AC":5},
		"titanium chain gauntlets":{"class":"armor", "weight":1,"AC":3},
		"titanium platebody":{"class":"armor", "weight":14,"AC":27},
		"titanium chain chestpiece":{"class":"armor", "weight":7,"AC":20},
		"titanium armguards":{"class":"armor", "weight":10,"AC":18},
		"titanium chain armguards":{"class":"armor", "weight":5,"AC":13},
		"titanium ring":{"class":"armor", "weight":1,"AC":1},
		"titanium bracelet":{"class":"armor", "weight":1,"AC":1},
		"titanium platelegs":{"class":"armor", "weight":10,"AC":18},
		"titanium chain pants":{"class":"armor", "weight":5,"AC":13},
		"titanium boots":{"class":"armor", "weight":3,"AC":6},
		"titanium shield":{"class":"armor", "weight":4,"AC":9},
		"adamant helmet":{"class":"armor", "weight":4,"AC":18},
		"adamant chain helmet":{"class":"armor", "weight":2,"AC":13},
		"adamant cape":{"class":"armor", "weight":0,"AC":1},
		"adamant necklace":{"class":"armor", "weight":1,"AC":1},
		"adamant gauntlets":{"class":"armor", "weight":3,"AC":7},
		"adamant chain gauntlets":{"class":"armor", "weight":1,"AC":5},
		"adamant platebody":{"class":"armor", "weight":18,"AC":37},
		"adamant chain chestpiece":{"class":"armor", "weight":9,"AC":28},
		"adamant armguards":{"class":"armor", "weight":13,"AC":25},
		"adamant chain armguards":{"class":"armor", "weight":6,"AC":18},
		"adamant ring":{"class":"armor", "weight":1,"AC":1},
		"adamant bracelet":{"class":"armor", "weight":1,"AC":1},
		"adamant platelegs":{"class":"armor", "weight":13,"AC":25},
		"adamant chain pants":{"class":"armor", "weight":6,"AC":18},
		"adamant boots":{"class":"armor", "weight":4,"AC":8},
		"adamant shield":{"class":"armor", "weight":6,"AC":12}
	};