import React, { Component } from 'react';

class FilteringTag extends Component{


  handleFilterClick = () => {
    this.props.history.push(`/search`);
    this.props.handleClick();
  }
  render(){
    return(
      <div>
        {this.props.filteringTag}
        <button onClick={this.handleFilterClick}>Delete filter</button>
      </div>
    )
  }
}

export default FilteringTag;