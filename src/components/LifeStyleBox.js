import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class LifeStyleBox extends Component{

    constructor(props){
        super(props)

    }

    renderBox(){
        let isSelected = this.props.isSelected
        if(isSelected){
            return(
                <View style={[styles.boxContainerStyle,{backgroundColor: '#1595d3'},this.props.style]}>
                    <TouchableOpacity onPress={this.props.onCloseButtonPress} style={styles.closeIconContainerStyle}>
                        <Image
                            source={require('./../source/icons/btnCloseWhite.png')}
                            style={styles.closeButtonImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onPress} style={styles.iconImageContainerStyle}>
                        <Image
                            source={this.props.imageUri}
                            style={styles.iconImageStyle}
                            resizeMode='contain'
                        />
                        <Text style={[styles.lifestyleTextStyle,{color: '#FFF'}]}>{this.props.boxTitle}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={[styles.boxContainerStyle,{backgroundColor: '#f6f6f6'},this.props.style]}>
                    <TouchableOpacity onPress={this.props.onPress} style={styles.iconImageContainerStyle}>
                        <Image
                            source={this.props.imageUri}
                            style={styles.iconImageStyle}
                            resizeMode='contain'
                        />
                        <Text style={[styles.lifestyleTextStyle,{color: '#919195'}]}>{this.props.boxTitle}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
  
  
    }

    render(){
        return(
            <View>
                {this.renderBox()}
            </View>
        )
    }
}

const styles={
    lifestyleBoxContainerStyle:{
        
    },
    boxContainerStyle:{
        width: responsiveHeight(15.49),
        height: responsiveHeight(15.49),
        borderRadius: 4.8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
        paddingTop: responsiveHeight(1),

    },
    closeIconContainerStyle:{
        alignItems: 'flex-end',

    },
    closeButtonImageStyle:{
        height: responsiveHeight(1.4),
    },
    iconImageContainerStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconImageStyle:{
        height: responsiveHeight(4.92),

    },
    lifestyleTextStyle:{
        fontSize: responsiveFontSize(2),

    }
}

export {LifeStyleBox}