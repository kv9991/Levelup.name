import React from 'react';
import Link from 'next/link'
import { connect } from 'react-redux'
import axios from 'axios'
import config from '../app.config.js'
import Loader from './loader'
import { getUserById } from '../actions/user.js'
import Avatar from 'react-avatar'
import router from 'next/router'

// 1. Разделить вид для владельца и для третьих лиц
// 2. Пофиксить баг с отображением small-темплейта


// Clever Component. Accepts UserID or accepts currentUser if UserID == null

export class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      user: null
    }
  }

  componentWillMount() {
    this.getUser(this.props.id)
  }


  componentWillReceiveProps(nextProps) {
    //this.getUser(nextProps.id)
  }

  componentWillUnmount() {
    this.setState({
      user: null
    })
  }

  async getUser(id) {
    if(id) {
      var user = await getUserById(id)
      await this.setState({
        user: {
          ...this.state.user,
          ...user.data
        }
      })
      await this.setState({
        isLoaded: true
      })
    } else {
      if(this.props.user.isLogged) {
        await this.setState({
          ...this.state,
          user: this.props.user.profile
        })
        await this.setState({
          isLoaded: true
        })
      } 
    }
  }

  render() {
    var user = this.state.user;
    if(this.state.isLoaded && this.state.user != null) {
        return (
          <div className={`${this.props.size} user`}>
            <div className="image">
              <Link href={{ pathname: 'user', query: { slug: user.slug }}}><a>
                <Avatar color={`#46978c`} round={true} size={32} src={user.userImage} name={user.userName} />
              </a></Link>
            </div>
            <div className="content">
              <Link href={{ pathname: 'user', query: { slug: user.slug }}}><a>
                <span className="name">{user.userName}</span>
              </a></Link>
              <div className={(this.props.size == 'small') ? `hidden` : `description`}>
                {(user.userDescription) ? user.userDescription : `Подписчиков: ${user.userSubscribersCount}`}
              </div>
            </div>
          
        		<style jsx>{`
      			.user {
      				display: flex;
              margin: 6px 0px;
              align-items: center;
      			}
            .user .image,
            .user .content {
              display:flex;
              align-items:flex-start;
              flex-direction:column;
            }
            .user.small {
              margin-bottom:6px;
            }
            .user.medium {
              margin-bottom:4px;
            }
            .user.small .image {
              width:20px;
              height:20px;
              margin:0px;
            }
            .user.medium .image {
              width:30px;
              height:30px;
            }
            .user.dropdown .content {
              display:none;
            }
            .user .image a {
              display:flex;
              justify-content:center;
              align-items:center;
            }
      			.user .content {
      				padding-left:12px;
      			}
            .user.small .content {
              padding-left:8px;
              margin:5px 0px;
            }
      			.user .content .name {
      				display:block;
      				font-size:16px;
      				font-weight:bold;
      			}
            .user.small .content .name {
              font-size:14px;
              font-weight:100;
            }
            .user.medium .content .name {
              font-size:14px;
            }
      			.user .content .description {
      				font-size:13px;
      				color:rgba(0,0,0,0.4);
      			}
            .user.medium .content .description {
              font-size:13px;
              margin-top:0px;
            }

        		`}</style>
          </div>
        ) 
    } else {
      return (<Blank size={this.props.size} />)
    }
  }
}


export class Blank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.size != 'dropdown') {
      return (
        <div className="user">
          <div className="blank string"></div>
          <div className="blank description"></div>
        </div>
      )
    } else {
      return (
        <div className="user">
          <div className="blank avatar"></div>
        </div>
      )
    }
  }
}




export default connect((store) => store)(User)