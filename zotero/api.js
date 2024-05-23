const queryString = window.location.search;
if ( queryString !== "" ) {
	fetch(`${url}/items?format=bib&style=${style}&${queryString.slice(1)}`, { headers: headers } )
	.then( (response) => response.text() )
	.then( (bib) => document.getElementById('biblist').innerHTML = bib )
	.catch((error) => { console.log(error) })
} else {
    document.getElementById('biblist').innerHTML = "Manca la query nella URL"
}
	
