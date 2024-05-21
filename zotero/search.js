fetch(`${url}/tags`, { headers: headers})
.then( (response) => response.json() )
.then( (jsonList) => {
  document.getElementById('tags').removeAttribute('hidden');
  document.getElementById('waittags').setAttribute('hidden','');
  jsonList.forEach( t => {
    var opt = document.createElement('option');
    opt.value = t.tag;
    opt.innerHTML = t.tag;
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
  Array.from(select.options).filter(x => x.selected).map(x => query += `&tag=${x.value}`);
  console.log(query);//const queryString = window.location.search;
  if (query !== "") {
	  fetch(`${url}/items?format=json${query}`, { headers: headers})
	  .then( (response) => response.json() )
	  .then( (bibList) => {
	    var titleList = '<ul>';
	    bibList.forEach(bib => {
	    var authors = "";
		bib.data.creators.map ( a => authors += `${a.firstName} ${a.lastName}, ` ) 
		titleList += `<li> ${authors.slice(0,-1)} ${bib.data.title}`
		if ( bib.data.url ) {
		  titleList += ' <a href="' + bib.data.url + '">(link)</a>'
		}
	  })
	  titleList = titleList + '</ul>'
	  document.getElementById('output').innerHTML = titleList;
	  document.getElementById('output').removeAttribute('hidden');
      document.getElementById('waitoutput').setAttribute('hidden','');
	  })
	  .catch((error) => { console.log(error) })
  } else {
	document.getElementById('output').innerHTML = "<p><b> Seleziona almeno un tag</b>";
	document.getElementById('output').removeAttribute('hidden');
    document.getElementById('waitoutput').setAttribute('hidden','');
  }
});
