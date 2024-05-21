const uid='14308190'
const collId='J22KD6XJ'
const apiKey='nQzLttqa7HtBpPrTmECXG8EN'

const url= `https://api.zotero.org/users/${uid}/tags`
fetch(url, { headers: {'Zotero-API-Key': apiKey}})
.then( (response) => response.json() )
.then( (jsonList) => {
  select = document.getElementById('select');
  jsonList.forEach( t => {
    var opt = document.createElement('option');
    opt.value = t.tag;
    opt.innerHTML = t.tag;
    select.appendChild(opt);
  })
})

select.addEventListener("change",function(e){
//  const outputDiv = document.getElementById("output");
  var query="";
  Array.from(select.options).filter(x => x.selected).map(x => query += `&tag=${x.value}`);
  console.log(query);//const queryString = window.location.search;
  const url=`https://api.zotero.org/users/${uid}/collections/${collId}/items?format=json${query}`
  fetch(url, { headers: {'Zotero-API-Key': apiKey}})
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
  })
  .catch((error) => { console.log(error) })
});

//const url=`https://api.zotero.org/users/${uid}/collections/${collId}/items?format=json&${queryString.slice(1)}`
//fetch(url, { headers: {'Zotero-API-Key': apiKey}})
//.then( (response) => response.json() )
//.then( (bibList) => {


//const queryString = window.location.search;
//const url=`https://api.zotero.org/users/${uid}/collections/${collId}/items?format=json&${queryString.slice(1)}`
//fetch(url, { headers: {'Zotero-API-Key': apiKey}})
//.then( (response) => response.json() )
//.then( (bibList) => {
  //var titleList = '<ul>';
  //bibList.forEach(bib => {
    //var authors = "";
	//bib.data.creators.map ( a => authors += `${a.firstName} ${a.lastName}, ` ) 
	//titleList += `<li> ${authors.slice(0,-1)} ${bib.data.title}`
	//if ( bib.data.url ) {
	  //titleList += ' <a href="' + bib.data.url + '">(link)</a>'
	//}
  //})
  //titleList = titleList + '</ul>'
  //document.getElementById('demo').innerHTML = titleList;
  //})
//.catch((error) => { console.log(error) })
