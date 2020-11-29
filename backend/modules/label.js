/* Contains logic to parse through a label image's text and return the pill object fields */

let helpers = require('./label_helpers');

var numDict = {"one" : 1, "two" : 2, "three" : 3, "four" : 4, "five" : 5, "six" : 6, "seven" : 7, "eight" : 8, "nine" : 9, "ten" : 10,
				"once" : 1, "twice" : 2};

/* Parses through the label text and returns a json object with populated pill fields */
const parseLabel = async (label) => {
	// JSON object mimicking the pill object
	var pillData = {"name": null, "totalQuantity" : null, "frequency" : null, "frequencyUnit" : null, "dosage" : null, "withFood" : false, "withSleep" : false};
	
	if (label.body === "" || label.body == null)
		return({ pillData: pillData, msg: 'Success'});
	
	let splitLabel = helpers.formatLabel(label);
	
	for (var i = 0; i < splitLabel.length; i++) {
	
		if (helpers.getName(splitLabel, i, pillData)) {
			// Total quantity often indicated before the pillName
			if (i !== 0 && (splitLabel[i-1] in numDict)){
				pillData.totalQuantity = numDict[splitLabel[i-1]];
			}
			else if (i !== 0 && Number.isInteger(parseInt(splitLabel[i-1], 10))){
				pillData.totalQuantity = parseInt(splitLabel[i-1], 10);
			}
			continue;
		}
		
		else if (helpers.getFreqUnit(splitLabel, i, pillData)){
			continue;
		}
		
		else if (helpers.getConditions(splitLabel, i, pillData)){
			continue;
		}
	
		else if (helpers.getDosage(splitLabel, i, pillData)){
			continue;
		}
	
		else if (helpers.getFreq(splitLabel, i, pillData)){
			continue;
		}
		
		else {
			helpers.getQuantity(splitLabel, i, pillData);
		}
	
	}
	return({ pillData: pillData, msg: 'Success'});
}

module.exports = {parseLabel};
