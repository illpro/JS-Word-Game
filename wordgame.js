

function WordGame(params) {
	
	this.dom_id = 'game-board';
	this.making_selection = false;
	this.current_word = '';
	
	this.dice   = [
        'AAEEGN', 'ELRTTY', 'AOOTTW', 'ABBJOO',
        'EHRTVW', 'CIMOTV', 'DISTTY', 'EIOSST',
        'DELRVY', 'ACHOPS', 'HIMNQU', 'EEINSU',
        'EEGHNW', 'AFFKPS', 'HLNNRZ', 'DEILRX',
    ]
	
	// use the key value pairs of params to override any default variables	
}


WordGame.prototype.renderBoard = function(skin) {
	
	// render the board using appropriate skin
	var board = document.getElementById(this.dom_id);
	
	var self = this;
	
	while (this.dice.length > 0) {
		
		var di_random_index = Math.round( Math.random() * (this.dice.length - 1) );
		var di = this.dice.splice(di_random_index, 1);
		
		var letter_random_index = Math.round( Math.random() * (di[0].length - 1) );
		var letter = di[0].charAt(letter_random_index);
		
		if (letter == 'Q') {
			letter = 'Qu';
		}
		
		var anchor_tag = document.createElement('span');
		anchor_tag.className = "";
		anchor_tag.innerHTML = letter;
		
		anchor_tag.onmousedown = function(event) {
			self.startSelection(event, this);
		};
		
		anchor_tag.onmouseover = function(event) {
			self.selectLetter(event, this);
		}
		
		anchor_tag.onmouseout = function(event) {
			self.prepareForNextSelection(event, this);
		}
		
		board.appendChild(anchor_tag);
	}
	
	window.onmouseup = function(event) {
		self.stopSelection(event);
	}
	
}


WordGame.prototype.startSelection = function(event, dom_object) {
	this.making_selection = true;
	dom_object.className = "selected";
	this.current_word += dom_object.innerHTML;
	return false;
}

WordGame.prototype.stopSelection = function(event) {
	
	var li = document.createElement('li');
	li.innerHTML = this.current_word;
	document.getElementById('played-words').appendChild(li);
	
	var letter_dom_nodes = document.getElementById(this.dom_id).childNodes;
	for (i=0; i < letter_dom_nodes.length; i++) {
		node = letter_dom_nodes[i];
		node.className = "";
	}
	
	this.current_word = '';
	this.making_selection = false;
	
	return false;
}

WordGame.prototype.selectLetter = function(event, dom_object) {
	if (this.making_selection == true) {
		if (dom_object.className == "selected") {
			// console.log('unselect');
			// 	dom_object.className = "";
			// 	this.current_word = this.current_word.slice(0,-1);
		}
		else {
			// console.log('select');
			dom_object.className = "selected";
			this.current_word += dom_object.innerHTML;
		}
	}
}

WordGame.prototype.prepareForNextSelection = function(event, dom_object) {
	
}