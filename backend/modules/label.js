
var pillNames = new Set(["acetaminophen", "adderall", "amitriptyline", "amlodipine", "amoxicillin", "ativan", "atorvastatin", "azithromycin", 
					 "benzonatate", "cephalexin", "ciprofloxacin", "citalopram", "hydrochlorothiazide", "ibuprofen", "hydrocodone", "lexapro", 
					 "levothyroxine", "lisinopril", "lipitor", "melatonin", "metaformin", "methadone", "metaprolol", "naproxen", 
					 "prinivil", "simvastitin", "synthroid","vicodin", "zestril", "zithromax", "zocore"]);
var frequencies = new Set(["daily", "weekly", "days", "weeks"]);

const parseLabel = async (label) => {
	try {
		var splitLabel = label.body.split(" ");
		return({msg: 'Success'});
	}
	catch (error) {
	   throw `The label could not be parsed`;
	}
}

module.exports = {parseLabel};
