#Declaring Important Things
declare -a material=("leather" "bronze" "brass" "gold" "iron" "steel" "mithril" "titanium" "adamant")
declare -a materialWeightValue=(20 34 45 30 40 38 25 55 70)
declare -a materialACValue=(10 20 28 33 40 60 65 100 140)
declare -a armor=("helmet" "chain helmet" "cape" "necklace" "gauntlets" "chain gauntlets" "platebody" "chain chestpiece" "armguards" "chain armguards" "ring" "bracelet" "platelegs" "chain pants" "boots" "shield")
declare -a armorWeightValue=(0.07 0.035 0.01 0.02 0.05 0.025 0.27 0.135 0.19 0.095 0.02 0.02 0.19 0.095 0.07 0.09)
declare -a armorACValue=(0.13 0.0975 0.01 0.01 0.05 0.0375 0.27 .2025 0.18 0.135 0.01 0.01 0.18 0.135 0.06 0.09)

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