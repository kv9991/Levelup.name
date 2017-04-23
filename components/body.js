import React from 'react';
import Menu from './header/menu'
import { connect } from 'react-redux'
import SearchBar from './searchbar'
import Feed from './feed/'
import Header from './header/'
import FlashPost from './flashpost'

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	flashpost: {
    		revealed: false
    	}
    }
  }

  render() {
  	var data = this.props.page,
  	    title = null,
  	    children = this.props.children;

  	if (data.showTitle) {
      title = (
        <h1 className="ui header">
		  {data.title}
		  <div className="sub header">{data.description}</div>
		</h1>
      )
    }
    return (
      <div className={`${this.props.classnames} main`}>
      	<div className="inner">

      		{data.displayHeader ? <Header/ > : ``}
      			<div className="after-header">
      				<div className="">
      	      	{data.beforeChildren}
      	      </div>
      				<div className={`${data.classnames}`}>
      					{title}
      					{children}
      	      </div>
      	      {data.afterChildren}
      		</div>
      	</div>
      </div>
    );
  }
}

export default connect((state) => state)(Body)