import React from "react"
import $ from "jquery"
import MyAjax from "./../md/MyAjax.js"
import {Link} from 'react-router-dom'

class Cart extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			flag:false,		//全选的标识
			cartInfo:false,	//标识购物车是否有商品
			isSelect:false, //标识单个商品是否被选中
			changeCart:true, //切换到编辑购物车的标识
			rmb:0,
			data:[],
			priceFlag:true
		}
	}
	
	componentWillMount(){
		var url = "http://10.9.160.44:3000/cart/cartlist";
		var that = this;
		var flag = false;
		var RMB = 0; 
		var priceFlag = true;		//商品总价是否大于199的标识
		MyAjax.fetch(url,(datas) => {
			console.log(datas)						
			if(!datas.length){
				flag = true;
			}
			
			for(var item of datas){				//计算购物车商品的总价钱
				RMB += item.number * item.price; 
			}
			
			if(RMB >= 199){						
				priceFlag = false;
			}
			
			that.setState({
				data:datas,
				cartInfo:flag,
				rmb:RMB,
				priceFlag:priceFlag
			})
		})		
	}
	
	componentDidMount(){
		document.getElementById("header").style.display = "none";
		document.getElementById("footer").style.display = "none";
	}
	
	
	allSelect(){
		if(this.state.flag){
			$(".s").css("display","block");
			let data = this.state.data;			//let效果相当于深拷贝了一个data数组
			for(var item of data){
				item.isSelct = true;
			}
			this.setState({
				flag:false,
				data:data
			})
		}else{
			$(".s").css("display","none");
			let data = this.state.data;			
			for(var item of data){
				item.isSelct = false;
			}
			this.setState({
				flag:true,
				data:data
			})
		}	
	}
	
	changeCart(){
		var flag = this.state.changeCart;
		flag = !flag;
		this.setState({
			changeCart:flag
		})
	}
	
	redDot(index){
		//console.log(index);
		var flag = this.state.data[index].isSelct;
		let data = this.state.data;				//同45行
		flag = !flag;
		data[index].isSelct = flag;
		this.setState({
			data
		})
	}
	
	delete(){						//执行删除操作
		var arr = [];
		var obj = {};
		var deleteIndex = [];
		var RMB = 0; 
		var priceFlag = true;
		var flag = false;

		this.state.data.map((item,index) => {
			if(item.isSelct == "true" || item.isSelct == true){
				arr.push(item._id)
				deleteIndex.push(index)
				obj = {
					arrs:arr
				}
			}	
		})
		console.log(arr)
		console.log(deleteIndex)
		if(JSON.stringify(obj) == "{}"){
			return false;
		}
		
		let data = this.state.data;
		deleteIndex = deleteIndex.reverse();
		for(var item of deleteIndex){
			data.splice(item,1);			
		}
		
		
		
		for(var item of data){				//计算购物车商品的总价钱
			RMB += item.number * item.price; 
		}
			
		if(RMB >= 199){						
			priceFlag = false;
		}
		
		if(!data.length){
			flag = true;
		}
		
		
		this.setState({
			rmb:RMB,
			priceFlag:priceFlag,
			cartInfo:flag,
			data
		})
		
//		console.log(obj)
//		var url = "http://10.9.160.44:3000/cart/deletecart";		//将需要删除的商品_id传到后台继续下一步操作
//		$.ajax({
//			type:"post",
//			url:url,
//			async:true,
//			data:obj,
//			success:function(data){
//				console.log(data)
//			}
//		});
	}
	
	reduce(index){
		var arr = [];
		var RMB = 0; 
		var priceFlag = true;
		console.log("reduce---------"+index)
		if(this.state.data[index].number <= 1){		//如果数量为一件，不执行后续操作
			return;
		}
		arr.push(this.state.data[index]._id)
		console.log(arr)
		
		let data = this.state.data;
		data[index].number -= 1;
		
		for(var item of data){				//计算购物车商品的总价钱
			RMB += item.number * item.price; 
		}
			
		if(RMB >= 199){						
			priceFlag = false;
		}
		
		this.setState({
			rmb:RMB,
			priceFlag:priceFlag,
			data
		})
	}
	
	add(index){
		var arr = [];
		var RMB = 0; 
		var priceFlag = true;
		console.log("add-----------"+index)
		arr.push(this.state.data[index]._id)
		console.log(arr)
		
		let data = this.state.data;
		var numbers = data[index].number;
		numbers = numbers * 1;
		numbers += 1;
		data[index].number = numbers;
		
		for(var item of data){				//计算购物车商品的总价钱
			RMB += item.number * item.price; 
		}
			
		if(RMB >= 199){						
			priceFlag = false;
		}
		
		this.setState({
			rmb:RMB,
			priceFlag:priceFlag,
			data
		})
	}
	
	left(){
		window.history.go(-1);
	}
	
	render(){
		var arr = [];
		this.state.data.map((item,index) => {
			//console.log(item)
			arr.push(
	
				<div className="contents" key={item._id}>
					
					<div className="revise" id={this.state.changeCart ? "revhide" : ""}>
						<p>
							<i className="iconfont icon-jianhao-copy" onClick={this.reduce.bind(this,index)}></i>
							<span>{item.number}</span>
							<i className="iconfont icon-jia1" onClick={this.add.bind(this,index)}></i>
						</p>
						<span id="id">¥{item.price}.00</span>
					</div>
					
					<div className="left">
						<span className="select" onClick={this.redDot.bind(this,index)}>
							<div className="b" id={item.isSelct?"reddot":""}></div>
						</span>
					</div>
					<div className="center">
						<img src={item.imgUrl}/>
					</div>
					<div className="right">
						<div className="name">
							<p>{item.name}</p>
						</div>
						<p className="color">颜色分类：<span>{item.color}</span> 尺码：<span>{item.size}</span></p>
						<p className="price"><span>¥{item.price}.00</span><span>×{item.number}</span></p>						
					</div>
				</div>
			)
			
		})
		if(this.state.cartInfo){
			return(
				<div id="cart">
					<div className="header">
						<p>
							<i className="iconfont icon-back_left"></i>
							<Link to="/home"><i className="iconfont icon-shouye"></i></Link>
							<span id="middle">购物车</span>
						</p>
					</div>
					<div className="content">
						<div id="empty">
							<img src="http://www.wanmeigou.com/images/shop_null.png"/>
							<p>购物车空空哒！</p>
							<p>快去随便逛逛吧~</p>
							<Link to="/home"><div className="guang">随便逛逛</div></Link>
						</div>
					</div>
				</div>	
			)
		}else{		
			return (
				<div id="cart">
					<div className="header">
						<p>
							<i className="iconfont icon-back_left" onClick={this.left.bind(this)}></i>
							<Link to="/home"><i className="iconfont icon-shouye"></i></Link>
							购物车
							<span onClick={this.changeCart.bind(this)}>编辑<span id="edit" className={this.state.changeCart ? "" : "uzi"}>完成</span></span>
						</p>
					</div>
					<div className="content">
							
						{arr}
					
					</div>
					<div className="footer">
						<div>
							<div>
								<span id="select" onClick={this.allSelect.bind(this)}>
									<div className="s"></div>
								</span>
								<p>全选</p>
							</div>
							<div></div>
						</div>
						<div>
							<p>合计 : <span>¥{this.state.rmb}.00</span></p>
							<p><span>不满199元,运费15元</span><span id="money" className={this.state.priceFlag ? "aaa" : ""}>已满199元，免运费</span></p>
						</div>
						<div>去结算</div>
						<div id="mark" className={this.state.changeCart ? "" : "markhide"}>
							<div id="delete" onClick={this.delete.bind(this)}>删除</div>
						</div>
					</div>
				</div>
			)	
		}		
	}
}

export default Cart;