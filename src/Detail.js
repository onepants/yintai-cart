import React from 'react'
import MyAjax from './md/MyAjax.js'
import Img from './assets/miao-cat-max.png'
import { Carousel, WingBlank } from 'antd-mobile'
import $ from 'jquery'
import {Link} from 'react-router-dom'

class Detail extends React.Component{
	constructor(props){
		super(props)
		this.reduce = this.reduce.bind(this)
		this.state = {
			list:"1234",
			name:"",
			oldPrice:"",
			nowPrice:"",
			itemCode:"",
			data: [],
    		imgHeight: 176,
    		color:[],
    		size:[],
    		number:1,
    		sizes:"",
    		colors:"",
    		bannerListArray:[],
    		good:"",
    		flag:false,
    		cartImg:[], //加入购物车的商品图片组成的数组
    		cartImgs:""  //默认选中数组当中的第一个
		}
	}
	
	componentWillMount(){
		var goodsID = this.props.match.params.itemid;
		var url = 'http://10.9.160.44:3000/detail?productId=' + goodsID;
		var that = this;
		MyAjax.fetch(url,(data) =>{
			var bannerlist = data.data.products[0].largeimgurls;
			var name = data.data.products[0].longname;
			var oldprice = data.data.products[0].marketprice;
			var newprice = data.data.products[0].ytprice;
			var itemcode = data.data.products[0].itemcode;
			var colorANDsize = data.data.products;
			var niubi = data.data.productparamsurl;
			
			var color = [];
			var size = [];
			var cartImgUrl = [];
			var bannerListArray = [];

			for(var item of colorANDsize){
				size.push(item.skuproperty[1].value)
				color.push(item.skuproperty[0].value)
				cartImgUrl.push(item.skuproperty[0].url)
				bannerListArray.push(item.largeimgurls)
			}

			color = new Set(color);
			size = new Set(size);
			cartImgUrl = new Set(cartImgUrl);
			color = [...color];
			size = [...size];
			cartImgUrl = [...cartImgUrl];
			
			that.setState({
				name:name,
				oldPrice:oldprice,
				nowPrice:newprice,
				itemCode:itemcode,
				data:bannerlist,
				color:color,
				size:size,
				sizes:size[0],
				colors:color[0],
				bannerListArray:bannerListArray,
				good:niubi,
				cartImg:cartImgUrl,
				cartImgs:cartImgUrl[0]
			})
		})	
	}
	
	
	
	color(index){
		$("#color").find("li").eq(index).addClass("red").siblings().removeClass("red");
		
		this.setState({
			colors:this.state.color[index],
			data:this.state.bannerListArray[index],
			cartImgs:this.state.cartImg[index]
		})			
	}
	size(index){
		$("#size").find("li").eq(index).addClass("red").siblings().removeClass("red");
		this.setState({
			sizes:this.state.size[index]
		})
	}
	reduce(){
		var nums = this.state.number;
		if(nums > 1){
			nums = nums - 1;
		}
		this.setState({
			number:nums
		})
	}
	add(){
		var nums = this.state.number;
		nums += 1;
		this.setState({
			number:nums
		})
	}
	

	
	componentDidMount(){
//		$("#color").children("li").eq(0).addClass("red")
//		console.log("adfdfd")
//		$("#size").find("li").eq("0").addClass("red")

		$("#contents").scroll(function(){
			var scroll = $(this).scrollTop();
			if(scroll >= 500){
				$("#top").show();
			}else{
				$("#top").hide();
			}
		})
	}
	
	left(){
		window.history.go(-1);
	}
	
	right(){
		var flag = this.state.flag;
		if(!flag){
			$(".hide").fadeIn();
			$(".right").addClass("red");
			$(".mark").css("display","block");
			this.setState({
				flag:true
			})
		}else{
			$(".right").removeClass("red");
			$(".hide").fadeOut();
			$(".mark").css("display","none");
			this.setState({
				flag:false
			})
		}
	}
	
	top(){
		$("#contents").animate({scrollTop:0},300);
	}
	
	mark(){
		$(".mark").css("display","none");
		$(".hide").fadeOut();
		$(".right").removeClass("red");
		this.setState({
			flag:false
		})
	}
	
	addStore(){
		var cartInfo = {};
		cartInfo.itemCode=this.state.itemCode;
		cartInfo.size=this.state.sizes;
		cartInfo.color=this.state.colors;
		cartInfo.number=this.state.number.toString();
		cartInfo.imgUrl=this.state.cartImgs;
		cartInfo.price=this.state.nowPrice;
		cartInfo.name=this.state.name;
		cartInfo.isSelct=true;

		var url = 'http://10.9.160.44:3000/cart/addcart'; 
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data:cartInfo,
			success:function(data){
				console.log(data)
			}
		});
	}
	
	render(){
		var arr = [];
		var arrs = [];
		this.state.color.map((item,index) => {
			arr.push(<li key={item} onClick = {this.color.bind(this,index)}>{item}</li>)
		})
		this.state.size.map((item,index) => {
			arrs.push(<li key={item} onClick = {this.size.bind(this,index)}>{item}</li>)
		})
		return (
			<div id="detail">
				<div className="mark" onClick={this.mark.bind(this)}></div>
				<div id="top" onClick={this.top.bind(this)}><i className="iconfont icon-arrows-5-1"></i></div>
				<header>
					<p>
						<i className="iconfont icon-back_left left" onClick={this.left.bind(this)}></i>
						商品详情
						<i className="iconfont icon-more_light right" onClick={this.right.bind(this)}></i>
					</p>
					<div className="hide">
						<ul>
							<li>
								<Link to="/home">
									<i className="iconfont icon-shouye"></i>
									<p>银泰首页</p>
								</Link>
							</li>
							<li>
								<Link to="/kind">
									<i className="iconfont icon-qr_code_light"></i>
									<p>分类</p>
								</Link>
							</li>
							<li>
								<Link to="/cart">
									<i className="iconfont icon-cart_light"></i>
									<p>购物车</p>
								</Link>
							</li>
							<li>
								<Link to="/user">
									<i className="iconfont icon-my_light"></i>
									<p>我的银泰</p>
								</Link>
							</li>
						</ul>
					</div>
				</header>
				

				<div id="contents">
				
				
					<div id="swiper">
						<WingBlank>
					        <Carousel
					          infinite
					          dots={true}
							  autoplay
					          selectedIndex={1}
					        >
					          {this.state.data.map(ii => (
					          	 <div
					              key={ii}
					              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
					            >
					              <img
					              	id="small"
					                src={ii}
					                alt=""
					                style={{ width: '100%', verticalAlign: 'top' }}
					                onLoad={() => {
					                  // fire window resize event to change height
					                  window.dispatchEvent(new Event('resize'));
					                  this.setState({ imgHeight: 'auto' });
					                }}
					              />
					            </div>  
					          ))}
					        </Carousel>
					    </WingBlank>	
		                <img className="cat" src={Img}/>
		            </div> 
						
					<div className="name">
						<div className="name_left">
							{this.state.name}
						</div>
						<div className="name_right">心</div>
					</div>
					
					<div className="price">
						<p>
							<span>¥<span>{this.state.nowPrice}.00</span></span>
							<span>¥{this.state.oldPrice}.00</span>
							<span>商品编号:{this.state.itemCode}</span>
						</p>
					</div>
					
					<div className="productbox">
						<div className="product">
							<div className="product-top">
								已选:&nbsp;&nbsp;&nbsp;{this.state.sizes}&nbsp;&nbsp;{this.state.colors}&nbsp;&nbsp;{this.state.number}件
							</div>
							<div className="product-bottom">
								<div>颜色分类:</div>
								<div className="small">
									<ul id="color">
										{arr}
									</ul>
								</div>
								<div>尺码:</div>
								<div className="small">
									<ul id="size">
										{arrs}
									</ul>
								</div>
								<div>数量:</div>
								<div>
									<div onClick={this.reduce.bind(this)}>-</div>
									<div>{this.state.number}</div>
									<div onClick={this.add.bind(this)}>+</div>
								</div>
							</div>
						</div>
					</div>
					
					<iframe src={this.state.good} width="375" height="1000"  frameborder="no" allowtransparency="yes"/>
					
					<div className="foot">
						<ul className="router">
							<li>
								<Link to="/home">
									<p>首页</p>
								</Link>
							</li>
							<li>
								<Link to="/kind">
									<p>分类</p>
								</Link>
							</li>
							<li>
								<Link to="/cart">
									<p>购物车</p>
								</Link>
							</li>
							<li>
								<Link to="/user">
									<p>我的</p>
								</Link>
							</li>
						</ul>
						<div className="login">
							<p><Link to="/login">登录</Link>|<Link to="/register">注册</Link><span>客户端下载</span></p>
						</div>
						<div className="last">
							<p>客服电话：400-119-1111（8:00-24:00）</p>
							<p>浙ICP备10200233号</p>
						</div>
					</div>					
				</div>
									
				<footer>
					<ul>
						<li>
							<Link to="/cart">
								<i className="iconfont icon-gouwuche"></i>
								<p>购物车</p>
							</Link>
						</li>
						<li onClick={this.addStore.bind(this)}>加入购物车</li>
						<li>立即购买</li>
					</ul>
				</footer>
			</div>
		)
	}
}

export default Detail;