import React from "react"
import {Link} from "react-router-dom"
import MyAjax from "./../md/MyAjax.js"


class List extends React.Component {
	constructor(props){
		super(props)
		this.getData = this.getData.bind(this)
		this.state = {
			list:[]
		}
	}
	
	getData(classID){
		var that = this;
		var url = 'http://datainfo.duapp.com/shopdata/getGoods.php?callback='
		MyAjax.getData(url,{
			params:{
				classID:classID
			}
		},(data) => {
			if(data == 0){
				that.setState({
					list:[]
				})
			}else{
				//console.log(eval(data))
				that.setState({
					list:eval(data)
				})
			}
			
		})
	}
	
	componentWillMount(){
		var classID = this.props.match.params.classID;
		this.getData(classID)
	}
	
	componentWillReceiveProps(nextProps){
		var classID = nextProps.match.params.classID;
		this.getData(classID)
	}

	render(){
		var arr = [];
		if(this.state.list.length > 0){
			this.state.list.map((item,index) => {
				arr.push(<Link to={"/detail/"+item.goodsID} key={item.goodsID}><li>{item.goodsName}</li></Link>)
			})
		}else{
			arr = "暂无数据"
		}
		return (
			<div>{arr}</div>
		)
	}
}

export default List;