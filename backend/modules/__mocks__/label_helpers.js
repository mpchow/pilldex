const label_helper = jest.createMockFromModule('./label_helpers');

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
	if (splitLabel[i] == "10" || splitLabel[i] == "ten") {
		pillData.totalQuantity = 10;
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
		pillData.withSleep = true;
		return 1;
	}
	if (splitLabel[i] == "food") {
		pillData.withFood = true;
		return 1;
	}
	return 0;
}

function getDosage(splitLabel, i, pillData) {
	if (splitLabel[i] == "2" || splitLabel[i] == "two") {
		pillData.dosage = 2;
		return 1;
	}
	return 0;
}

function getFreq(splitLabel, i, pillData) {
	if (splitLabel[i] == "once" || splitLabel[i] == "1") {
		pillData.frequency= 1;
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
