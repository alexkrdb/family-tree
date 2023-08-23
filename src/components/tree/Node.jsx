import {Component} from "react"

class Node extends Component{
    render(){
        const {person, ...otherProps} = this.props;
       return (
        <div className="treeNode" {...otherProps}>
            <p>{person.firstName}</p>
            <p>{person.lastName}</p>
        </div>
       ) 
    }
}

export default Node