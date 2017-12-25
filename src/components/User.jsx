import React from "react"

class User extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		document.getElementById("header").style.display = "block";
		document.getElementById("footer").style.display = "block";
	}
	
	render(){
		return (
			<div>个人中心</div>
		)
	}
}

export default User;