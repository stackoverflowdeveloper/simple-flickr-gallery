import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Gal from './gal.jsx';




class App extends Component {


	constructor(props) {
		super(props);
		
		this.state = {
			query: '',
			gallery:null
			
		}
	}
	
	
	
	search(){
		//console.log('this.state', this.state);

		/* API request: 
		https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=.....
		&tags=cat&format=json&nojsoncallback=1
		&api_s...
		*/

		const searchApiFlickrUrl ='https://api.flickr.com/services/rest/?method=flickr.photos.search';
		const flickrApiKey ='api_key=eef6678ef9d79a510fcbb045a6ba86b9';
		const flickrApiKeyS = 'api_s72f1609920eacb9f';
		const FetchUrl = searchApiFlickrUrl + '&' + flickrApiKey + '&' + 'tags=' + this.state.query + '&' +'format=json&nojsoncallback=1'
		+'&' + flickrApiKeyS;

		// console.log(FetchUrl);
		fetch(FetchUrl, {
			method:'GET'
		})

		.then(response => response.json())
		.then(json => { 
	
		//const arr=[];

		const gallery=[];


		for (let i=0; i<100; i++ ) {
		let farmId = json.photos.photo[i].farm; 
		let id = json.photos.photo[i].id;
		let serverId= json.photos.photo[i].server;
		let secret =json.photos.photo[i].secret;	

		//	arr.push(farmId, id, serverId, secret); 
		//	console.log ('id', id , 'farm', farmId ); check
		/* 
		path to single img: 
		https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.jpg
		*/
		let singlePicSmall = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id +'_' + secret;// +'_t'+ '.jpg'; 
		//let singlePicBig	= 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id +'_' + secret +'_b'+ '.jpg'; 
		// console.log (singlePicSmall);

		gallery.push(singlePicSmall);

		}			
		this.setState({gallery});
		//console.log(gallery); 
		});

	}




	render(){
	//	console.log(gallery.picture);


		return (
			<div className="app">
				<div className="App-Title"> 
				Simple Flickr Gallery
				</div>
				<FormGroup>
					<InputGroup>
						<FormControl type='text' placeholder='Search images by tag'

						value={this.state.query}
						onChange={event=> {this.setState({query:event.target.value})}}
						onKeyPress={event=> {if 
							(event.key==='Enter'){
							this.search()
						}}}
						 />
						
						<InputGroup.Addon onClick={()=>this.search()} >
							<Glyphicon glyph='search'></Glyphicon>
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
					<Gal gallery={this.state.gallery}/>
			
			
			</div>
			)
	}

}

export default App; 