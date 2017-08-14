var position    = -1,                                                //starting postion of image array
	images      = ['img/chicago.jpg','img/la.jpg','img/ny.jpg'],     // storing images into images
	parent      = document.getElementById('photos'),                 //grabs photos from html and stores it into parents
	clearActive = function(p){                                       //sets clearActive to a function and passing photos
		for(var i = 0; i < p.length; i++){                           //the loops throught the array of photos
			p[i].classList.remove('active');                         //removes active claass from photos
		}                                                            //end of loop
	},                                                               //end of function
	update = function(evt){                                          //sets update to equal fucntions                                        
		clearActive(parent.children);                                //that grabs clearactive from line 4
		if(evt.classList.contains('prev')){                          //that fires off
			if(position > 0){                                        // comepares it to the current postion of the image
				position --;                                         // subtracts 1 going to the prev photo
			} else {
				position = images.length - 1;                        //sets position to the prev image
			}
			
		} else {
			if(position == (images.length - 1)){                    //if its negative return it back to 0
				position = 0;
			} else {
				position ++;                                       //if not then add 1
			}
		}
		return imgHashMap[position].elem.classList.add('active');  //returns the current page and gives active to display
	},
	slide       = function(){                                      // sets up slide to a function
		return setTimeout(function(){                              // returns set timeout function
			if(position >= images.length - 1){                     // checks to see which image is net 
				position = -1;                                     // thanks that image number and minus 1 to get the actual photo number
			}
			position++                                             //increments postion by 1 
			console.log(position)                                  // consoles log it
			var key,keys;                                          // creates two vars to store keys
			keys = Object.keys(imgHashMap);                        // set keys to object.keys of image
			clearActive(parent.children);                          //grabs active
			for(key in keys){                                      // loops through imagehash and finds keys
				if(position == imgHashMap[key].id){                // compares current postion number to image id if
					imgHashMap[key].elem.classList.add('active');  // they match give it active and it will display
				}
			}	
			slide(imgHashMap,(images.length -1))                   //passing the image and the lmage array length
		},6000);                                                   // runs every 6 seconds

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
