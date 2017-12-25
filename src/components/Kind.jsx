import React from "react"


class Kind extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		document.getElementById("header").style.display = "block";
		document.getElementById("footer").style.display = "block";
	}
	
	render(){

		return (
			<div>fenlei</div>
		)
	}
}

export default Kind;