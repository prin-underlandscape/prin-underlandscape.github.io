var collections;

fetch(`${url}/collections`, { headers: headers})
.then( (response) => response.json() )
.then( (jsonList) => {
  console.log(jsonList);
  collections=jsonList;
  document.getElementById('tags').removeAttribute('hidden');
  document.getElementById('waittags').setAttribute('hidden','');
  jsonList.forEach( c => {
    var opt = document.createElement('option');
    opt.value = c.data.name;
    opt.innerHTML = c.data.name;
    document.getElementById('select').appendChild(opt);
  })
})
.catch((error) => { console.log(error) })

document.getElementById('select').addEventListener('change',function(e){
//  const outputDiv = document.getElementById("output");
  document.getElementById('waitoutput').removeAttribute('hidden');
  document.getElementById('waitoutput').innerHTML = 'Sto cercando nella bibliografia'
  document.getElementById('output').setAttribute('hidden','');
  var query="";
  var selected = Array.from(select.options).filter(opt => opt.selected)[0].value;
  console.log(selected)
  var collectionKey = collections.find( c => c.data.name === selected).data.key;
  console.log(collectionKey)
  fetch(`${url}/collections/${collectionKey}/items?format=bib&style=${style}`, { headers: headers})
  .then( (response) => response.text() )
  .then( (bib) => {
	document.getElementById('output').innerHTML = bib;
	document.getElementById('output').removeAttribute('hidden');
    document.getElementById('waitoutput').setAttribute('hidden','');
  })
  .catch((error) => { console.log(error) })
});
