
var container = null;
var wrapper = null;
var menu_visible = false;

function loaded() {
    container = document.getElementById("radial_container");

    console.log(container);

    document.body.addEventListener('click', click); 
}

function click(event) {
    if(!menu_visible){
        container.style.left =`${event.clientX}px`;
        container.style.top = `${event.clientY}px`;
        makeMenu(randomInt(3, 12));
        menu_visible = true;
    } else {
        backClicked(null);
    }
}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function makeMenu(slices) {

    //createCenter()

    //make the wrapper
    makeWrapper();
    createCenter();

    //create a list
    const unordered_list = document.createElement("ul");

    var spacer = 0.5;
    var central_angle = (360 / slices);
    var slice_angle = central_angle - spacer;
    var skew_angle = 90 - (slice_angle - spacer);
    
    var initial_angle = 90 - (central_angle/2);

    for(let i = 0; i < slices; i++) {
        //Create the slice element in the list
        const slice = document.createElement("li");

        //Create the internal content of the element
        const slice_internal = document.createElement("div");
        slice_internal.className="internal";

        //add image
        const slice_img = document.createElement("img");
        slice_img.src = "icon.png";
        slice_img.style.maxWidth=`15%`;

        slice_internal.appendChild(slice_img);

        //add a span for text
        const slice_content = document.createElement("div");
        slice_content.className="contents"
        slice_content.appendChild(document.createTextNode(`test ${i}`));  
        slice_internal.appendChild(slice_content);
        
        //Skew/Rotate the list element
        const rotate = initial_angle + central_angle * i + spacer;
        slice.style.transform = `rotate(${rotate}deg) skew(${skew_angle}deg)`;

        //skew/rotate the internal
        const rotate_back = -(90 - (central_angle / 2) + spacer);
        slice_internal.style.transform = `skew(${-skew_angle}deg) rotate(${rotate_back}deg) scale(1)`;

        console.log(rotate + rotate_back);
        //slice_content.style.transform = `rotate(${-(rotate + rotate_back)}deg)`;
        slice_img.style.transform = `rotate(${-(rotate + rotate_back)}deg)`;

        slice.appendChild(slice_internal);
        unordered_list.appendChild(slice);
    }

    
    wrapper.appendChild(unordered_list);

    Delay.byFrame(() =>
    {
        console.log("delayed");
        wrapper.classList.add('opened-nav');
    }, 1);
    console.log("opened");
}

function makeWrapper() {
    if(wrapper == null) {
        const list_wrapper = document.createElement("div");
        list_wrapper.className = "list_wrapper";

        container.appendChild(list_wrapper);

        wrapper = list_wrapper;
    }
}

function createCenter() {
    const center_node = document.createElement("div");
    center_node.className = "circle";
    center_node.appendChild(document.createTextNode("Back"));
    center_node.addEventListener('click', backClicked); 
    wrapper.appendChild(center_node);
}

function backClicked(event) {
    if(menu_visible) {
        wrapper.remove();
        wrapper = null;
        menu_visible = false;

        if(event != null){
            event.cancelBubble = true;
        }
    }
}

class Delay {
    /**
     * Invokes a function after a given number of frames.
     * @param {Function} callback - The callback that will be executed after a given number of frames.
     * @param {number} [count = 1] - Number of frames after which the call will be executed.
     * @param {any[]} [callbackArguments] - Arguments that have to be passed to the callback.
     */
    static byFrame(callback = (...params) => { }, count = 1, ...callbackArguments) {
        if (count === 0) {
            return callback(...callbackArguments);
        }

        count--;

        requestAnimationFrame(() => {
            this.byFrame(callback, count, ...callbackArguments);
        });
    }
}