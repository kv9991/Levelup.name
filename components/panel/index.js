import React from 'react';
import { Pages } from './pages'
import { Users } from './users'
import { Posts } from './posts'

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel-wrapper">
      	<div className="ui grid">
          <div className="sixteen wide column">
            <div className="ui grid">
              <div className="twelve wide column">
                <Posts />
              </div>
              <div className="four wide column">
                <p>Статистика</p>
              </div>
            </div>
          </div>
    		  <div className="six wide column">
    		  	<Pages />
    		  </div>
          <div className="six wide column">
            <Users />
          </div>
    		</div>
      </div>
    );
  }
}