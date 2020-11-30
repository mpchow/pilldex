const label_helper = jest.createMockFromModule('fs');

const formattedLabel = [
  'local',         'pharmacy', 'rx#',
  '0004921—39s',   'customer', 'name',
  'generic',       'rx',       '500',
  'mg',            'tablet',   '',
  'take',          'one',      'tablet',
  'twice',         'daily',    '',
  'prescription',  'no.',      'store',
  'no.prescribed', 'by:',      'a.',
  'doctor',        'qty:',     '20',
  'no',            'refills',  'remain',
  'prescriber',    'auth',     'required',
  '123',           'rx',       'avenue',
  'new',           'york,',    'ny',
  'new',           'date',     'filled:',
  '02/05/2019',    'discard',  'by:',
  '02/05/2020',    '(555)',    '555',
  '-555'
];

export default function formatLabel(label) {
	console.log("MOCK FUNCTION CALLED");
	return formattedLabel;
}

export default function getName(splitLabel, i, pillData) {
	pillData.name = null;	
	return 1;
}

export default function getQuantity(splitLabel, i, pillData) {
	pillData.totalQuantity = 20;
	return 1;
}

export default function getFreqUnit(splitLabel, i, pillData) {
	pillData.totalQuantity = "daily";
	return 1;
}

export default function getConditions(splitLabel, i, pillData) {
	pillData.withSleep = false;
	pillData.withFood = false;
	return 1;
}

export default function getDosage(splitLabel, i, pillData) {
	pillData.dosage = 1;
	return 1;
}

export default function getFreq(splitLabel, i, pillData) {
	pillData.dosage = 2;
	return 1;
}

label_helper.formatLabel = formattedLabel;
label_helper.getName = getName;
label_helper.getQuantity = getQuantity;
label_helper.getFreqUnit = getFreqUnit;
label_helper.getConditions = getConditions;
label_helper.getDosage = getDosage;
label_helper.getFreq = getFreq;

module.exports = label_helper;
