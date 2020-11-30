const label_helper = jest.createMockFromModule('./label_helpers');

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

function formatLabel(label) {
	var label_lc = label.body.toLowerCase();
	var splitLabel = label_lc.replace( /\n/g, " " ).split(" ");
	return splitLabel;
}

function getName(splitLabel, i, pillData) {
	if (splitLabel[i] == "acetaminophen") {
		pillData.name = "acetaminophen";	
		return 1;
	}
	return 0;
}

function getQuantity(splitLabel, i, pillData) {
	console.log(splitLabel[i]);
	if (splitLabel[i] == "30") {
		pillData.totalQuantity = 30;
		return 1;
	}
	return 0;
}

function getFreqUnit(splitLabel, i, pillData) {
	if (splitLabel[i] == "daily") {
		pillData.frequencyUnit = "daily";
		return 1;
	}
	return 0;
}

function getConditions(splitLabel, i, pillData) {
	if (splitLabel[i] == "sleep") {
		pillData.withSleep = false;
		return 1;
	}
	if (splitLabel[i] == "food") {
		pillData.withFood = false;
		return 1;
	}
	return 0;
}

function getDosage(splitLabel, i, pillData) {
	if (splitLabel[i] == "once") {
		pillData.dosage = 1;
		return 1;
	}
	return 0;
}

function getFreq(splitLabel, i, pillData) {
	if (splitLabel[i] == "2") {
		pillData.frequency= 2;
		return 1;
	}
	return 0;
}

label_helper.formatLabel = formatLabel;
label_helper.getName = getName;
label_helper.getQuantity = getQuantity;
label_helper.getFreqUnit = getFreqUnit;
label_helper.getConditions = getConditions;
label_helper.getDosage = getDosage;
label_helper.getFreq = getFreq;

module.exports = label_helper;
