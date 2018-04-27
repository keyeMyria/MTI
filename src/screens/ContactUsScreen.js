import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import {MainSubmitButton} from '../components/MainSubmitButton';

export default class ContactUsScreen extends Component{

    constructor(props){
        super(props)
        this.gotoBranchSearch = this.gotoBranchSearch.bind(this);
    }

    gotoBranchSearch(){
        this.props.navigator.push({
            screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
            passProps:{},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.contactUsScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='ติดต่อเรา'
                    rightIconName='iconBell'
                />
                <View style={styles.contactUsContainerStyle}>
                    <View style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/contactUsBanner01.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </View>
                    <View style={styles.contactListContainerStyle}>
                        <Text style={styles.contactTitleTextStyle}>ติดต่อเมืองไทยประกันภัย</Text>
                        <Text style={styles.contactDesciptionTextStyle}>252 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ  103101 โทร. 1484   แฟกซ์ : 0-2665-4166, 0-2274-9511, 0-2276-2033</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../source/icons/iconMessage01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../source/icons/iconFacebook.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../source/icons/iconMapMarker01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.iconGroupContainerStyle}>
                                <Image
                                    source={require('../source/icons/iconPhone02.png')}
                                    resizeMode='contain'
                                    style={styles.iconPhoneImageStyle}
                                />
                                <Text style={styles.callTextStyle}>Call Now</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <Text style={styles.contactTitleTextStyle}>ติดต่อแผนกลูกค้าสัมพันธ์ โทร. 1484 กด 3</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../source/icons/iconMessage01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../source/icons/iconMapMarker01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.iconGroupContainerStyle}>
                                <Image
                                    source={require('../source/icons/iconPhone02.png')}
                                    resizeMode='contain'
                                    style={styles.iconPhoneImageStyle}
                                />
                                <Text style={styles.callTextStyle}>Call Now</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <MainSubmitButton
                            buttonTitleText='ค้นหาสาขาย่อย'
                            onPress={this.gotoBranchSearch}
                        />
                    </View>
                    <View style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/serviceBannerImg02.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    contactUsScreenContainerStyle:{
        flex: 1,
    },
    contactUsContainerStyle:{
        flex: 1,
    },
    topBannerImageContainerStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
    },
    contactListContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        justifyContent: 'center',
    },
    contactTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3"
    },
    contactDesciptionTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#919195"
    },
    contactListSectionStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5),
    },
    iconGroupContainerStyle:{
        flexDirection: 'row',

    },
    iconPhoneImageStyle:{
        height: responsiveHeight(2.81),
        width: responsiveHeight(2.81),
        marginRight: responsiveWidth(1),
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
    iconImageStyle:{
        height: responsiveHeight(4.22),
        width: responsiveHeight(4.22),
        marginRight: responsiveWidth(1.5),
    },
    callTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: 'rgb(253, 98, 98)',
    }
}