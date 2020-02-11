#!/bin/bash
#Download and check minecraft usernames
#minecraftURLChecker=https://minecraft.net/haspaid.jsp?user=

#-----DO NOT USE
#program makes and saves the true/false of each name like this
# /working/XYZ/abcbasd.jsp
#be wary
#-----DO NOT USE

currentName=""
currentNameAddon=""


function decimal_to_base36(){
	BASE36=($(echo {0..9} {A..Z} {_.._}));
	arg1=$@;
	for i in $(bc <<< "obase=36; $arg1"); do
		echo -n ${BASE36[$(( 10#$i ))]}
	done && echo
}

function getCurrentUsername {
	a=1295
	b=0
	while [ $a -lt 46656 ]; do
		((b=a))
		((a=a+1))
		
		currentNameAddon=$(decimal_to_base36 $a)
		currentUsername=https://minecraft.net/haspaid.jsp?user=$currentNameAddon
		echo $currentUsername
		httrack $currentUsername
		mv ~/Desktop/mcnames/minecraft.net ~/Desktop/mcnames/$currentNameAddon
		rm -r ~/Desktop/mcnames/index.html
		rm -r ~/Desktop/mcnames/hts-cache

		sleep .1
	done
}

getCurrentUsername