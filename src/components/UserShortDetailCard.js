import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class UserShortDetailCard extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.userShortDetailCardContainerStyle}>
                <View style={styles.userAvatarContainerStyle}>
                    <View style={styles.avatarBorderStyle}>
                        <Image
                            source={require('./../source/images/userAvatarImg.png')}
                            style={styles.userAvatarImageStyle}
                            resizeMode='cover'
                        />
                    </View>
                </View>
                <View style={styles.userShortDetailContainerStyle}>
                    <Text style={styles.userNameTextStyle}>ชรินทร์ทิพย์  บำรุงศักดิ์</Text>
                    <Text style={styles.userLevelTextStyle}>สมาชิกระดับ Silver</Text>
                    <View style={styles.seeUserDetailLinkContainerStyle}>
                        <TouchableOpacity style={styles.seeUserDetailLinkSectionStyle}>
                            <Image
                                source={require('./../source/icons/iconAvatar.png')}
                                style={styles.detailIconLinkImageStyle}
                                resizeMode='contain'
                            />
                            <Text style={styles.userDetailLinkTextStyle}>ดูข้อมูลส่วนตัว</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.seeUserDetailLinkSectionStyle}>
                            <Image
                                source={require('./../source/icons/iconInsurance.png')}
                                style={styles.detailIconLinkImageStyle}
                                resizeMode='contain'
                            />
                            <Text style={styles.userDetailLinkTextStyle}>ดูข้อมูลกรมธรรม์</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userQrContainerStyle}>
                    {this.props.showQr?    
                        <TouchableOpacity>
                            <Image
                                source={require('./../source/images/dashboardQr.png')}
                                style={styles.userQrImageStyle}
                                resizeMode='contain'
                            />
                        <Text style={styles.myCardTextStyle}>My Card</Text>
                        </TouchableOpacity>:<View/>
                    }
                </View>
            </View>
        )
    }
}

const styles={
    userShortDetailCardContainerStyle:{
        flexDirection: 'row',
        backgroundColor: '#f6f6f6',
        height: responsiveHeight(16.19),
        paddingTop: responsiveHeight(3),
        paddingBottom: responsiveHeight(3),
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',

    },
    userAvatarContainerStyle:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    avatarBorderStyle:{
        height: responsiveHeight(11.26),
        width: responsiveHeight(11.26),
        borderWidth: responsiveFontSize(0.4),
        borderRadius: responsiveHeight(5.63),
        borderColor: "#d8d8d9",
        alignItems: 'center',
        justifyContent: 'center',

    },
    userAvatarImageStyle:{
        height: responsiveHeight(10.47),
        width: responsiveHeight(10.47),
        borderRadius: responsiveHeight(5.235),
    },  
    userShortDetailContainerStyle:{
        flex: 0.5,
        justifyContent: 'space-between',
    },
    userNameTextStyle:{
        fontSize: responsiveFontSize(3.2),
        color: '#1595d3',
        letterSpacing: 0,
    },
    userLevelTextStyle:{
        fontSize: responsiveFontSize(2),
        color: '#919195',
        letterSpacing: 0,
    },
    seeUserDetailLinkContainerStyle:{
        flexDirection: 'row',

    },
    seeUserDetailLinkSectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',

    },
    detailIconLinkImageStyle:{
        height: responsiveHeight(2.11),
        width: responsiveWidth(3.28),
    },
    userDetailLinkTextStyle:{
        fontSize: responsiveFontSize(2),
        color: '#919195',
        letterSpacing: 0,
        marginLeft: responsiveWidth(1.2),
        marginRight: responsiveWidth(2),

    },
    userQrContainerStyle:{
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    userQrImageStyle:{
        height: responsiveHeight(4.22),
        alignSelf: 'center',

    },
    myCardTextStyle:{
        fontSize: responsiveFontSize(2),
        color: '#919195',
        letterSpacing: 0,
        textAlign: 'center',

    },
}

export {UserShortDetailCard}