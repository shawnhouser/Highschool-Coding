#Auto Complete formating
#Declaring Important Things
declare -a material=("Leather" "Bronze" "Brass" "Gold" "Iron" "Steel" "Mithril" "Titanium" "Adamant")
declare -a armor=("Helmet" "Chain Helmet" "Cape" "Necklace" "Gauntlets" "Chain Gauntlets" "Platebody" "Chain Chestpiece" "Armguards" "Chain Armguards" "Ring" "Bracelet" "Platelegs" "Chain Pants" "Boots" "Shield")
weightValue=0
ACValue=0
z=0
y=0
echo -e '\t<datalist id="itemDataList">'
#Gets the Length of the Strings
materialLength=${#material[@]}
armorLength=${#armor[@]}
while [ $z -lt ${materialLength} ] ; do
	#Don't let it keep adding. So it repeats again
	((y=0))
	while [ $y -lt ${armorLength} ] ; do
		#a=Row * ColumnNumber - In Floating Point and then out of Floating point
		#My One line wonder
		#echo it in the correct format
		# -e is to allow the \t to make a tab
		echo -e '\t\t<option>'${material[$z]}' '${armor[$y]}'</option>'
		((y=y+1))
	done
	((z=z+1))
done
echo  -e '\t</datalist>'

#Reads Out Like This
#	1	2	3
#	4	5	6
#	7	8	9