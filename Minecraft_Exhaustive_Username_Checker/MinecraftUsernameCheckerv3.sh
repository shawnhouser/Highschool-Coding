#!/bin/bash
#Download and check minecraft usernames
#minecraftURLChecker=https://minecraft.net/haspaid.jsp?user=

function decimal_to_base36(){
	BASE36=($(echo {0..9} {A..Z} {_.._}));
	arg1=$@;
	for i in $(bc <<< "obase=36; $arg1"); do
		echo -n ${BASE36[$(( 10#$i ))]}
	done && echo
}

function getCurrentUsername {
	a=1296
	while [ $a -lt 46656 ]; do
		((a=a+1))
		
		currentNameAddon=$(decimal_to_base36 $a)
		currentUsername=https://minecraft.net/haspaid.jsp?user=$currentNameAddon
		
		if [ ! $(curl -s https://minecraft.net/haspaid.jsp?user=$currentNameAddon) = true ]
			then
				echo $currentNameAddon >> openNames.txt
				echo $currentNameAddon
		fi
	done
}

getCurrentUsername