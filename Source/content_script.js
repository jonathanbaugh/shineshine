var replacement_classes = [
	// From, To
	{ base: /shit/gi, replacements: [
		{from: /\bshit\b/gi, to: "shine"},
		{from: /\bshitpost\b/gi, to: "shinepost"},
		{from: /\bshitposts\b/gi, to: "shineposts"},
		{from: /\bshitposting\b/gi, to: "shineposting"},
		{from: /\bshit posting\b/gi, to: "shine posting"},
		{from: /\bshitshitpost/gi, to: "reallyshinypost"},
		{from: /\bshitshitshitpost/gi, to: "reallyquiteshinypost"},
		{from: /\bshitty/gi, to: "shiny"},
		{from: /\bas shit\b/gi, to: "as shiny"},
		{from: /\b(bull|bat|horse)\s?shit\b/gi, to: "sparkly $1"},
		{from: /\bknow shit\b/gi, to: "know much"}
	]},
	{ base: /fuck/gi, replacements: [
		{from: /\bI fucked up\b/gi, to: "I Learned From My Mistakes"},
		{from: /\bfuck(-| )*up\b/gi, to: "lesson"},
		{from: /\bfuck(ing|ed|er)?\b/gi, to: "duck$1"}
	]},
	{ base: /./i, replacements: [
		{from: /\btifu\b/gi, to: "TILFMM"},
		{from: /\bvs(\.)?\b/gi, to: "plays with"},
		{from: /\bhell\b/gi, to: "hug"},
	]}
];

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	

	if (node.tagName && (node.tagName.toLowerCase() in ['textarea', 'input', 'script', 'style'])) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			console.log(node.nodeValue);
			handleText(node);
			break;
	}
}

function replace_match_case(str, find, replace)
{
	// TODO: Actually match case
	return str.replace(find, replace);
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;
	var r = 0;

	if (v.trim() == "") {
		return;
	}

	var root_skip = [];
	var replacements = null;

	for (c=0; c<replacement_classes.length; c++) {
		if (!v.match(replacement_classes[c].base)) {
			continue;
		}

		replacements = replacement_classes[c].replacements;

		for (r=0; r<replacements.length; r++) {
			v = replace_match_case(v, replacements[r].from, replacements[r].to);
		}
	}
	
	textNode.nodeValue = v;
}

if (document.location)
walk(document.body);
