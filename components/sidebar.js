import React from 'react';
import Link from 'next/link'
import UserList from './user-list'
import TagsList from './tags-list'
import { connect } from 'react-redux'
import User from './user'
import cookies from 'js-cookie'
import router from 'next/router'
import { getLogout, getUserField } from '../actions/user'
import { UI } from '../utils/initscripts.js'
import Loader from './loader.js'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.user.profile;
    this.state = {
    	subscriptions: {
    		users: null,
    		blogs: null,
    		tags: [],
    		popular: ['здоровье', 'веб-разработка', 'чтиво', 'блог', 'программирование']
    	}
    }
  }


  componentWillMount() {
  	if(this.currentUser) {
		getUserField(this.currentUser._id, 'userSubscriptions').then((res) => {
			this.setState({
				subscriptions: {
					...this.state.subscriptions,
					users: res.data.userSubscriptions,
					blogs: [{hello: 'world'}]
				}
			})
		})
	}
  }

  componentDidMount() {
  	this.setFooter()
  	UI();
  }

  async handleLogout() {
  	await cookies.remove('x-access-token', { path: '' });
  	await this.props.dispatch({type: 'LOGOUT'});
  	await router.push('/', '/', {})
  }

  // Упростить
  setFooter() {
  	var footer = document.getElementById('footer');
  	var footerHeight = footer.scrollHeight;
  	var windowHeight = window.innerHeight;
  	var sidebar = document.getElementsByClassName('sidebar')[0];
  	sidebar.style.paddingBottom = footerHeight + 10 + 'px';
  	footer.style.top = 100 + '%'
  	footer.style.marginTop =  (this.state.auth) ? (footerHeight/2 + 'px') : (-footerHeight + 'px')
  }

  userBarSwitch() {
  	$('.sidebar')
  	.dimmer('add content', $('.sidebar .menu.vertical'))
  	.dimmer('show');
  }

  render() {
    return (
      <div className="sidebar">
      	{!this.props.user.isLogged ? 
      		<div>
      			<div className="block profile simple">
      				<Link href="/auth"><a><i className="fa fa-lock"></i> Авторизация</a></Link>
      			</div>
      			<div className="block sidebar-block">
	      			<div className="title">
	      				<h3 className="ui header">
							Темы <small>популярные</small>
						</h3>
					</div>
					<div className="block-content">
						{(this.state.subscriptions.popular) ?
		      				<TagsList tags={this.state.subscriptions.popular} /> : <Loader />
		      			}
		      		</div>
      			</div>
      		</div>
      		: 
      		<div>
	      		<div className="profile block">
		      		<User />
		      		<div className="button userbar">
			      		<div onClick={() => {this.userBarSwitch()}} className="ui icon top left pointing button">
						  <i className="fa fa-angle-down"></i>
						</div>
					</div>

				    <div className="ui secondary vertical menu block-shadow">
				      <div className="block profile">
						  <a className="item"><i className="fa fa-user"></i> Мой профиль</a>
						  <a className="item"><i className="fa fa-pencil"></i> Написать пост</a>
						  <a className="item"><i className="fa fa-cog"></i> Редактировать</a>
						  <a className="item"><i className="fa fa-flash"></i> Статистика</a>
						  <div className="ui divider"></div>
						  <a onClick={() => {this.handleLogout()}} className="item"><i className="fa fa-sign-out"></i> Выход</a>
					  </div>
					</div>
		      	</div>

		      	<div className="block add">
		      		<Link href="/editor" prefetch><button className="large basic fluid circular ui button inverted">
					  Написать пост
					</button></Link>
		      	</div>

		      	<div className="block sidebar-block" id="subscriptions">
		      		<div className="title">
			      		<h3 className="ui header">
							Подписки <small>исследовать</small>
						</h3>
		      		</div>
		      		<div className="block-content">
		      			{(this.state.subscriptions.users) ?
		      				<UserList users={this.state.subscriptions.users} /> : <Loader />
		      			}
		      			<div className="ui divider"></div>
		      			{(this.state.subscriptions.blogs) ?
		      				<UserList users={this.state.subscriptions.blogs} /> : <Loader />
		      			}
		      		</div>
		      	</div>

		      	<div className="block sidebar-block" id="tags">
		      		<div className="title">
			      		<h3 className="ui header">
							Темы <small>исследовать</small>
						</h3>
		      		</div>
		      		<div className="block-content">
		      			{(this.state.subscriptions.tags) ?
		      				<TagsList tags={this.state.subscriptions.tags} /> : <Loader />
		      			}
		      		</div>
		      	</div>
	      	</div>
      	}
	      	<div className="block footer" id="footer">
	      		<div className="block-content">
	      			<div className="ui dropdown switcher">
					  <div className="text"><b>Levelup.name <i className="fa fa-angle-down"></i></b></div>
					  <div className="menu">
					    <div className="item">Levelupmusic</div>
					    <div className="item">Levelupworlds</div>
					    <div className="item">Levelupplace</div>
					  </div>
					</div>
	      			<div className="menu">
	      				<a href="#">помощь</a>
	      				<a href="#">карьера</a>
	      				<a href="#">блог</a>
	      				<a href="#">публичность</a>
	      				<a href="#">о проекте</a>
	      			</div>
	      		</div>
	      	</div>
		  <style jsx>{`
				.block.add {
					padding-top:0px;
				}
				.sidebar {
					position:relative;
					overflow-y:scroll;
					background:#101010;
				}

				.sidebar::-webkit-scrollbar {
					display:none;
				}

				.sidebar::-webkit-scrollbar-thumb {
					display:none;
				}

				.sidebar-block .title .ui.header {
					color:#fff;
				}

				.footer {
					background:transparent;;
					position:absolute;
					left:0px;
				}
		  		.footer .menu {
					display:flex;
					flex-wrap:wrap;
					flex-direction:row;
		  		}
		  		.footer .switcher .menu {
					display:none;
					bottom:100%!important;
					margin-bottom:10px;
					top:auto!important;
		  		}
		  		.footer .menu a {
		  			display:inline-block;
					margin-right:10px;
					margin-bottom:5px;
					color:#c0c0c0;
		  		}
		  		.footer .switcher {
		  			margin-bottom:5px;
		  			color:#fff;
		  			display:block;
		  		}
		  		.profile  {
		  			position:relative;
		  			text-align:left;
		  		}
		  		.profile.simple {
		  			 height:85px;
		  			 display:flex;
		  			 justify-content:center;
		  			 align-items:center;
		  		}
		  		.profile.simple a {
					font-size:15px;
					font-weight:bold;
					color:#fff;
		  		}
		  		.profile .menu .profile .content .description {
		  			color:#c0c0c0!important;
		  		}
		  		.profile .secondary.menu {
					text-align:left;
		  		}
				.profile .button {
					position: absolute;
					right:0px;
					top:0px;
					bottom:0px;
					display:flex;
					justify-content:center;
					align-items:center;
					padding:10px;
					margin-right:18px;
					cursor:pointer;
					transition:0.2s all ease;
					background:none!important;
					height:auto;
				}
				.button:focus {
					background:#c0c0c0!important;
				}
		    `}</style>  
		</div>
    );
  }
}

export default connect((store) => store)(Sidebar)