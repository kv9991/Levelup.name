// Important
import React from 'react';

// Utils
import { getPosts } from '../../actions/post.js'
import { getUserSubscriptions } from '../../models/blog.js'

// Components
import Loader from './loader.js'
import SubscribeButton from './subscribeButton.js'
import TimeAgo from 'timeago-react';
import User from './user.js'
import Link from 'next/link'
import Avatar from 'react-avatar'

export default class PostList extends React.Component {
   constructor(props) {
		super(props);
		this.state = {
			posts: [],
			isLoaded: false
		}
   } 

	componentWillMount() {
		if(this.props.posts === undefined) {
			if(this.props.subscriber) {
				getUserSubscriptions(this.props.subscriber).then((res) => {
					this.setState({
						posts : res.data,
						isLoaded: true
					})
				})
			}
		} else {
			this.setState({
				posts: this.props.posts,
				isLoaded: true
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.posts) {
			this.setState({
				posts: nextProps.posts
			})
		}
	}

   componentDidMount() {
	  	this.setState({
	  		isLoaded: true
	  	})
   }

   render() {
	  if(this.state.isLoaded) {
	  	  if(this.state.posts.length == 0) {
		      return (
		        <div className="no-content">
		          <p>Список пуст</p>
		        </div>
		      )
		   } else {
		   	return (
		       <div className="post-list">
		       	<div className="ui items">
			         {this.state.posts.map((item, i) => {
			           return <Post size={this.props.size} post={item} key={i} />
			         })}
			      </div>
		         <style jsx>{`
						.post-list {
							width:100%;
						}
		         `}</style>
		       </div>
		     )
		   }
	   } else {
		   return (<Loader />)
	   }
	}
}

class Post extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var post = this.props.post
		if (post) {
			if(this.props.size != 'block') {
				return (
					<div className="item">
						<Link href={{ pathname: 'post', query: { slug: post.slug }}}><a>
                <Avatar color={`#46978c`} round={true} size={32} src={post.image} name={post.title} />
            </a></Link>
            <div className="content">
							<h4 className="ui header">
								<Link href={{ pathname: 'post', query: { slug: post.slug }}}>
									<a>{post.title}</a>
								</Link>
								<div className="sub header">
									<TimeAgo datetime={post.updated} locale='ru' />
								</div>
							</h4>
						</div>
						<style jsx>{`
							.item {
								margin:10px 0px;
								border-bottom:1px solid rgba(255,255,255,0.2);
								display:flex;
								align-items:center;
								flex-direction:row;
								padding:7px 0px;
								overflow:hidden;
								max-width:100%;
							}
							.item:last-child {
			        	border-bottom:0px;
			        	padding-bottom:0px!important;
				      }
							.item .header .sub {
								white-space:nowrap;
								max-width:100%;
								overflow:hidden;
								position:relative;
							}
							.item .header .sub span {
								margin-right:10px;
							}
							.item .header .sub span i {
								color:#c0c0c0;
							}
							.item:before {
								background: -moz-linear-gradient(left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); /* FF3.6-15 */
								background: -webkit-linear-gradient(left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
								background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
								filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=1 ); /* IE6-9 */
								position:absolute;
								left:0px;
								width:100%;
								top:0px;
								height:100%;
							}
							.item:last-child {
								border-bottom:0px;
							}
							.item:first-child {
								margin-top:0px;
							}
							.item .content {
								margin-left:10px;
							}
							.item .content .sub.header {
								font-size:13px;
								margin-top:2px;
								opacity:0.7;
							}
						`}</style>
					</div>
				) 
			} else {
				return (
	      	<article className="article">
	  				<div className="content">
		 				<div className="meta">
		 					<span><TimeAgo datetime={post.updated} locale='ru' /></span>
						</div>
		 				<Link href={{ pathname: 'post', query: { slug: post.slug }}}>
							<a><h3>{post.title}</h3></a>
						</Link>
						<p className="primary">{post.postDescription}</p>
					</div>
					<style jsx>{`
						.article p.primary {
							font-size:15px;
						}
						.article .meta span {
							margin-right:15px;
							font-size:14px;
							color:#57c1b3;
						}
						.article .meta span .fa {
							color:rgba(0,0,0,0.3);
							font-size:16px;
							margin-right:3px;
						}
						.article h3 {
							margin:4px 0px;
						}
					`}</style>
				</article>
	    		);
			}
		} else {
			return (<div></div>)
		}
	}
}
