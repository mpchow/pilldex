/* Contains logic to parse through a label image's text and return the pill object fields */

let helpers = require('./label_helpers');

/* Parses through the label text and returns a json object with populated pill fields */
const parseLabel = async (label) => {
	try {
		// JSON object mimicking the pill object
		var pillData = {"name": null, "totalQuantity" : null, "frequency" : null, "frequencyUnit" : null, "dosage" : null, "withFood" : false, "withSleep" : false};

		let splitLabel = helpers.formatLabel(label);
		console.log(splitLabel);

		for (var i = 0; i < splitLabel.length; i++) {

			if (helpers.getName(splitLabel, i, pillData)) {
				// Total quantity often indicated before the pillName
				if (i != 0 && splitLabel[i-1] in numDict)
					pillData.totalQuantity = numDict[splitLabeli-1];
				else if (i != 0 && Number.isInteger(parseInt(splitLabel[i-1])))
					pillData.totalQuantity = parseInt([splitLabeli-1]);
			}
			
			else if (helpers.getFreqUnit(splitLabel, i, pillData))
				continue;
			
			else if (helpers.getConditions(splitLabel, i, pillData))
				continue;

			else if (helpers.getDosage(splitLabel, i, pillData))
				continue;

			else if (helpers.getFreq(splitLabel, i, pillData))
				continue;
			
			else 
				helpers.getQuantity(splitLabel, i, pillData);

		}
		console.log(pillData);
		return{ pillData:pillData, msg: 'Success'};
	}
	catch (error) {
	   return {msg: 'The label could not be parsed'};
	}
}

module.exports = {parseLabel};
