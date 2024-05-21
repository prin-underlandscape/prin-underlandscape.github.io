const queryString = window.location.search;
if ( queryString !== "" ) {
	fetch(`${url}/items?format=json&${queryString.slice(1)}`, { headers: headers } )
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
} else {
    document.getElementById('biblist').innerHTML = "Manca la query nella URL"
}
	
