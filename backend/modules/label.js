/* Contains logic to parse through a label image's text and return the pill object fields */

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

/* Parses through the label text and returns a json object with populated pill fields */
const parseLabel = async (label) => {
	try {
		// JSON object mimicking the pill object
		var pillData = {"name": null, "totalQuantity" : null, "frequency" : null, "frequencyUnit" : null, "dosage" : null, "withFood" : false, "withSleep" : false};

		// Convert all the text to lower case and split by spaces and new lines 
		var label_lc = label.body.toLowerCase();
		var splitLabel = label_lc.replace( /\n/g, " " ).split(" ");

		for (var i = 0; i < splitLabel.length; i++) {

			// Check for the pill name and total quantity
			if (pillNames.has(splitLabel[i])) {
				pillData.name = splitLabel[i];
				console.log(pillData.name);

				// Total quantity often indicated before the pillName
				if (i != 0 && splitLabel[i-1] in numDict)
					pillData.totalQuantity = numDict[splitLabeli-1];
				else if (i != 0 && Number.isInteger(parseInt(splitLabel[i-1]))) 
					pillData.totalQuantity = parseInt([splitLabeli-1]);
			}

			// Check for the frequency unit 
			else if (weekly.has(splitLabel[i]))
				pillData.frequencyUnit = "weekly";

			else if (daily.has(splitLabel[i]))
				pillData.frequencyUnit = "daily";

			// Check if the pill should be taken with food
			else if (withFood.has(splitLabel[i]))
				pillData.withFood = true;

			// Check if the pill should be taken at night
			else if (withSleep.has(splitLabel[i]))
				pillData.withSleep = true;

			// Check for dosage (number of pills to take each time)
			else if (dosageSignals.has(splitLabel[i])) {
				if (i != splitLabel.length - 1 && splitLabel[i+1] in numDict) {
					pillData.dosage = numDict[splitLabel[i+1]];
				}
				else if (i != splitLabel.length - 1 && Number.isInteger(parseInt(splitLabel[i+1]))){
					pillData.dosage = parseInt(splitLabel[i+1]);
				}
			}

			// Check for frequency (number of times pill(s) taken / frequency unit)
			else if (frequencySignals.has(splitLabel[i])){
				if (i != 0 && splitLabel[i-1] in numDict) {
					pillData.frequency = numDict[splitLabel[i-1]];
				}
				else if (i != 0 && Number.isInteger(parseInt(splitLabel[i-1]))){
					pillData.frequency = parseInt(splitLabel[i-1]);
				}
				else if (splitLabel[i] in numDict) {
					pillData.frequency = numDict[splitLabel[i]];
				}
			}

			// Check for total quantity not indicated next to pillName
			else if (totalQuantitySignals.has(splitLabel[i])) {
				if (i != splitLabel.length - 1 && splitLabel[i + 1] in numDict) {
					pillData.totalQuantity = numDict[splitLabel[i+1]];
				}
				else if (i != splitLabel.length - 1 && Number.isInteger(parseInt(splitLabel[i+1]))) {
					pillData.totalQuantity = parseInt(splitLabel[i+1]);
				}
			}
		}
		console.log(pillData);
		return{ pillData:pillData, msg: 'Success'};
	}
	catch (error) {
	   throw `The label could not be parsed`;
	}
}

module.exports = {parseLabel};
