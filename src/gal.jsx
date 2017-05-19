import React, {Component} from 'react';

class Gal extends Component {

	render(){

	//	console.log('this.props.g',this.props.gallery);
		let pictures; 
		let key;
		
		return (
			<div className='gallery'>
				{this.props.gallery !== null ? 
	
		pictures = this.props.gallery.map((picture, key )=> {
			return	(
				<div key={key} className="picture"
				>
				<img src={picture + '_s'+ '.jpg'} 
				className="picture-img"
				alt="picture" 
				/></div>
				)
		})
		: <div></div>
			}
			</div>

			)


	}


}
export default Gal;
