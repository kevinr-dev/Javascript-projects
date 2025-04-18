let getlist = document.querySelector('ul');

let dots = document.querySelectorAll('.dot');


getlist.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        
        // inner means find as parent
        const childDiv = event.target.querySelector('.dot');
        childDiv.classList.toggle('checked');
    }
    if (event.target.tagName === 'DIV')
    {
        event.target.classList.toggle('checked');

        //get closest outside of div
        const li = event.target.closest('LI');
        li.classList.toggle('checked');
    }
});



function newli ()
{
    let li = document.createElement("li");

    let inputText = document.getElementById('task').value;
    if (inputText != '') {
        let dot = document.createElement("div");
        dot.classList.add("dot");

        li.appendChild(dot);

        let text = document.createTextNode(inputText);

        li.appendChild(text);

        document.getElementById('list').appendChild(li);

        document.getElementById('task').value = "";

        // close button
        let span = document.createElement("SPAN");

        let innerSpan = document.createElement("SPAN");
        let innerSpanTxt = document.getElementById('categorySelect').value;
        innerSpan.textContent = innerSpanTxt;
        innerSpan.classList.add("category");

        span.appendChild(innerSpan);

        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);

        span.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(span);
    }
}


// filter

const filterInput = document.getElementById('filter');

filterInput.addEventListener('keyup', function() {
    const list = document.getElementById('list');
    const items = list.getElementsByTagName('li');

    let filterValue = filterInput.value.toLowerCase();

    for(let i = 0; i <items.length; i++)
    {
        let item = items[i];

        let itemText = item.textContent || item.innerHTML;

        if(itemText.toLowerCase().indexOf(filterValue) > -1) {
            item.style.display = '';
        }
        else {
            item.style.display = "none";
        }
    }

});