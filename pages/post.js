import React from 'react'
import { startClock } from '../actions'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Post from '../components/post/'
import Body from '../components/body'
import PostAfter from '../components/post/postafter' 

class PostContainer extends React.Component {

  static getInitialProps ({ store, isServer }) {
    return {

    }
  }

  constructor(props) {
    super(props);
    this.state = {
      page: {
        classnames: 'post',
        title: 'Пост',
        description: 'Публикация от пользователя',
        showTitle: false,
        children: <Post />,
        beforeChildren: null,
        afterChildren: <PostAfter />,
        displayHeader: true
      }
    }
  }

  componentDidMount() {
    window.$ = require('jquery');
    require('../static/css/ui/semantic.min.js');
    var dropdown = require('semantic-ui-dropdown');
    $('.ui.dropdown').dropdown();
  }


  render () {
    var page = this.state.page

    return (
      <div>
        <Sidebar />
        <Body page={page}>{page.children}</Body>
      </div>
    )
  }
}

export default withRedux(initStore, state => state)(PostContainer)