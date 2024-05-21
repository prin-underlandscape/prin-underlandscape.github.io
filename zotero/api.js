const uid='14308190'
const collId='J22KD6XJ'
const apiKey='nQzLttqa7HtBpPrTmECXG8EN'

const queryString = window.location.search;
const url=`https://api.zotero.org/users/${uid}/collections/${collId}/items?format=json&${queryString.slice(1)}`
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
  document.getElementById('biblist').innerHTML = titleList;
  })
.catch((error) => { console.log(error) })
