
// List of common prescription drugs to look for in the label
// TODO: add this to the db instead 
var pillNames = new Set(["acetaminophen", "adderall", "amitriptyline", "amlodipine", "amoxicillin", "ativan", "atorvastatin", "azithromycin", 
					 "benzonatate", "cephalexin", "ciprofloxacin", "citalopram", "hydrochlorothiazide", "ibuprofen", "hydrocodone", "lexapro", 
					 "levothyroxine", "lisinopril", "lipitor", "melatonin", "metaformin", "methadone", "metaprolol", "naproxen", 
					 "prinivil", "simvastitin", "synthroid","vicodin", "zestril", "zithromax", "zocore"]);

// Dictionary mapping digits to their string values
var numDict = {"one" : 1, "two" : 2, "three" : 3, "four" : 4, "five" : 5, "six" : 6, "seven" : 7, "eight" : 8, "nine" : 9, "ten" : 10,
				"once" : 1, "twice" : 2};

// Sets containing signal words that indicate potential value(s) for each of the pill fields
var weekly = new Set(["weekly", "week", "week"]);
var daily = new Set(["daily", "day"]);
var withFood = new Set(["food", "nausea", "nauseous", "meal", "meals"]);
var withSleep = new Set(["sleep", "drowsy", "bed", "bedtime", "night", "nights"]);
var dosageSignals = new Set(["take", "dosage", "dosage:", "take:"]);
var frequencySignals = new Set(["times", "once", "twice"]);
var totalQuantitySignals = new Set(["qty", "quantity", "#", "qty:", "quantity:", "#:"]);


// Convert all the text to lower case and split by spaces and new lines 
function formatLabel(label) {
	var label_lc = label.body.toLowerCase();
	var splitLabel = label_lc.replace( /\n/g, " " ).split(" ");
	console.log(splitLabel);
	return splitLabel;
}

function getName(splitLabel, i, pillData) {
	if (pillNames.has(splitLabel[i])) {
		pillData.name = splitLabel[i];	
		return 1;
	}
	return 0;
}

function getQuantity(splitLabel, i , pillData) {
	if (totalQuantitySignals.has(splitLabel[i])) {
		if (i != splitLabel.length - 1 && splitLabel[i + 1] in numDict) {
			pillData.totalQuantity = numDict[splitLabel[i+1]];
			return 1;
		}
		else if (i != splitLabel.length - 1 && Number.isInteger(parseInt(splitLabel[i+1]))) {
			pillData.totalQuantity = parseInt(splitLabel[i+1]);
			return 1;
		}
	}
	return 0;
}

function getFreqUnit(splitLabel, i, pillData) {
	if (weekly.has(splitLabel[i])){
		pillData.frequencyUnit = "weekly";
		return 1;
	}
	else if (daily.has(splitLabel[i])){
		pillData.frequencyUnit = "daily";
		return 1;
	}
	return 0;
}

function getConditions(splitLabel, i, pillData) {
	// Check if the pill should be taken with food
	if (withFood.has(splitLabel[i])) {
		pillData.withFood = true;
		return 1;
	}

	// Check if the pill should be taken at night
	else if (withSleep.has(splitLabel[i])) {
		pillData.withSleep = true;
		return 1;
	}
	return 0;
	
}

function getDosage(splitLabel, i, pillData) {
	if (dosageSignals.has(splitLabel[i])) {
		if (i != splitLabel.length - 1 && splitLabel[i+1] in numDict) {
			pillData.dosage = numDict[splitLabel[i+1]];
			return 1;
		}
		else if (i != splitLabel.length - 1 && Number.isInteger(parseInt(splitLabel[i+1]))){
			pillData.dosage = parseInt(splitLabel[i+1]);
			return 1;
		}
	}
	return 0;
}

function getFreq(splitLabel, i, pillData) {
	if (frequencySignals.has(splitLabel[i])){
		if (i != 0 && splitLabel[i-1] in numDict) {
			pillData.frequency = numDict[splitLabel[i-1]];
			return 1;
		}
		else if (i != 0 && Number.isInteger(parseInt(splitLabel[i-1]))){
			pillData.frequency = parseInt(splitLabel[i-1]);
			return 1;
		}
		else if (splitLabel[i] in numDict) {
			pillData.frequency = numDict[splitLabel[i]];
			return 1;
		}
	}
	return 0;
}

module.exports = {formatLabel, getName, getQuantity, getFreqUnit, getConditions, getDosage, getFreq };
