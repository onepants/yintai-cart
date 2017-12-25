import React from "react"

class Home extends React.Component {
	constructor(props){
		super(props)
	}
	
	componentDidMount(){
		document.getElementById("header").style.display = "block";
		document.getElementById("footer").style.display = "block";
	}

	render(){
		return (
			<div className="swiper-container">
			    <div className="swiper-wrapper">
			        <div className="swiper-slide">Slide 1</div>
			        <div className="swiper-slide">Slide 2</div>
			        <div className="swiper-slide">Slide 3</div>
			    </div>
			</div>
		)
	}
}

export default Home;