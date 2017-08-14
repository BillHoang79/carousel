var position    = -1,                                                         // global variable to keep track of the position of the carousel
	images      = ['img/chicago.jpg','img/la.jpg','img/ny.jpg'],              // image data => can scale
	parent      = document.getElementById('photos'),
	clearActive = function(p){
		for(var i = 0; i < p.length; i++){
			p[i].classList.remove('active');
		}
	},
	update = function(evt){                                                   
		clearActive(parent.children);
		if(evt.classList.contains('prev')){
			if(position > 0){
				position --;
			} else {
				position = images.length - 1;
			}
			
		} else {
			if(position == (images.length - 1)){
				position = 0;
			} else {
				position ++;
			}
		}
		return imgHashMap[position].elem.classList.add('active');
	},
	slide       = function(){
		return setTimeout(function(){
			if(position >= images.length - 1){
				position = -1;
			}
			position++
			console.log(position)
			var key,keys;
			keys = Object.keys(imgHashMap);
			clearActive(parent.children);
			for(key in keys){
				if(position == imgHashMap[key].id){
					imgHashMap[key].elem.classList.add('active');
				}
			}	
			slide(imgHashMap,(images.length -1))
		},6000);

	},
	imgHashMap = (function(elem,files){
		var obj = {},
			returnObj = {},
			clone;
		for(var i = 0; i < files.length; i++){	                               // looping over our image data
			clone = i == 0 ? elem : elem.cloneNode(true);                      // ternary operator for returning element back to the dom
			if(clone.children){
				clone.children[0].src = files[i]; 							   // seeing if there is an image inside => a little brittle atm but it works
			}
			obj = {}; 														   // clearing out obj
			obj.id = i; 													   // setting hash id
			obj.src = files[i]; 											   //building out obj for hashmap
			obj.elem = clone;                                                  // adding element to hash for access in methods
			returnObj[i] = obj;                                                // creating dynamic hashmap for us to access in slide()
			parent.appendChild(clone);                                         // push cloned image element back into image container
		}
		parent.children[0].classList.add('active');       					   // set first image to active
		slide(returnObj,(files.length - 1));						   
		return imgHashMap = returnObj;
	}(document.querySelector('.photo'),images));
