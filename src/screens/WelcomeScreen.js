import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import app from '../stores/app';
class WelcomeScreen extends Component{

    constructor(props){
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this);
        this.app = app;
    }
    gotoLogin(){
     this.app.login();
    }

    render(){
        return(
            <View style={styles.welcomeScreenContainerStyle}>
                 {isIphoneX() && <View style={{height:40}}>
                        <ImageBackground
                            source={require('./../source/images/bgGradient.png')}
                            style={styles.welcomeContentBackgroundImageStyle}
                            resizeMode='stretch'
                        />
                 </View>}
                <View>
                    <ImageBackground
                        source={require('./../source/images/banner.png')}
                        resizeMode='stretch'
                        style={styles.bannerImageStyle}
                    >
                        <TouchableOpacity onPress={this.gotoLogin}>
                            <Image
                            source={require('./../source/icons/btnCloseWhite.png')}
                            style={styles.closeButtonImageStyle}
                            resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.welcomeDetailContainerStyle}>
                    <ImageBackground
                        source={require('./../source/images/bgGradient.png')}
                        resizeMode='stretch'
                        style={styles.welcomeContentBackgroundImageStyle}
                    >
                        <View style={styles.bannerBottomLineStyle}/>
                        <View style={styles.logoContainerStyle}>
                            <Image
                                source={require('./../source/images/Logo.png')}
                                style={styles.logoImageStyle}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.welcomeTextContainerStyle}>
                            <Text style={styles.welcomeTitleTextStyle}>ยินดีต้อนรับเข้าสู่ เมืองไทย เฟรนด์ คลับ</Text>
                            <View>
                                <Image
                                    source={require('./../source/icons/quote1.png')}
                                    style={styles.quoteImageStyle}
                                    resizeMode='contain'
                                />
                            </View>
                            <View>
                                <Text style={styles.welcomeDetailTextStyle}>เพื่อนสนิทที่สร้างแรงบันดาลใจและเติมเต็มทุกความสุขของคุณ</Text>
                            </View>
                            <View>
                                <Image
                                    source={require('./../source/icons/quote2.png')}
                                    style={styles.quoteImageStyle}
                                    resizeMode='contain'
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}

const textColor = '#9acfe7'
const marginTop = Platform.OS==='ios'? 25:30
const styles={
    welcomeScreenContainerStyle:{
        flex: 1,
        //backgroundColor: 'red'
    },
    bannerImageStyle:{
        ...ifIphoneX({
            height: responsiveHeight(45)
        }, {
            height: responsiveHeight(53.52)
        })

    },
    closeButtonImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end',
        marginTop: marginTop,
        marginRight: 10,
    },
    welcomeDetailContainerStyle:{
        flex: 1,
    },
    bannerBottomLineStyle:{
        height: responsiveHeight(0.35),
        backgroundColor: '#000',
        opacity: 0.2,
    },
    logoContainerStyle:{
        alignItems: 'center',
        marginTop: '5%'
    },
    logoImageStyle:{
        height: responsiveHeight(11.88),
    },
    welcomeContentBackgroundImageStyle:{
        flex: 1,
    },
    welcomeTextContainerStyle:{
        alignItems: 'center',

    },
    welcomeTitleTextStyle:{
        color: textColor,
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),

    },
    quoteImageStyle:{
        height: responsiveHeight(2)
    },
    welcomeDetailTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(4),
        textAlign: 'center',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        letterSpacing: 0,
        lineHeight: responsiveHeight(7),
    }
}

export default WelcomeScreen