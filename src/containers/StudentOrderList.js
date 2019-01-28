import React, {Component} from "react";
import * as Icon from 'react-feather';
import { Col, Container, Row, Table, Badge } from "react-bootstrap";
import DisplayMedium from "../components/typography/DisplayMedium";
import DisplayLarge from "../components/typography/DisplayLarge";
import Heading from "../components/typography/Heading";
import Textbody from "../components/typography/Textbody";
import Subheading from "../components/typography/Subheading";
import LoadingSpinner from "../components/LoadingSpinner";
import {timeDifferenceForDate} from '../utils'

export default class StudentOrderList extends Component{
  constructor(props){
      super(props);
  }


  render(){
      return(
     <div>
      <DisplayLarge>Your Orders</DisplayLarge>
      </div>
      )
      
  }
}