import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {PastEventCard} from './../components/PastEventCard';
import { observer, inject } from 'mobx-react';
import {post,authen,get} from '../api';
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';

@inject('naviStore')
@observer
export default class DashboardScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            hotDealDefault:[
                {
                    bannerUri: require('./../source/images/wefitness-logo.png'),
                    iconUri: require('./../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
                },
                {
                    bannerUri: require('./../source/images/wefitness-logo.png'),
                    iconUri: require('./../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
                },
            ],

            myLifeStyle:[],
            pastEvent:[
                {
                    bannerUri: require('./../source/images/latestActImg.png'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                },
                {
                    bannerUri: require('./../source/images/latestActImg.png'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                }
            ],
            hotDeal:[],
            isLoading:true
        }
        this.props.naviStore.navigation = this.props.navigator;
        this.openDetail = this.openDetail.bind(this);
        this.goToPrivilleges = this.goToPrivilleges.bind(this);
    }
    async componentDidMount(){
        let user = await store.get("user");
        this.setState({isLoading:true});
        if(user){
            let response = await get("me",{});
            if(response){
                await store.update("user",response);
                this.setState({isLoading:false});
            }else{
                this.setState({isLoading:false});
            }
            let privilegeGroup = await get("privilege/groups",{});
            if(privilegeGroup){
                await store.save("privilegeGroup",privilegeGroup.data);
            }
            let hotDeal = await get("privileges?filter_set=hotdeal&page=1&pagesize=5",{});
            if(hotDeal){
                console.log(hotDeal.data);
                this.setState({hotDeal:hotDeal.data});
            }
            let myLife = await get("privileges?filter_set=lifestyle&page=1&pagesize=5",{});
            if(myLife){
                this.setState({myLifeStyle:myLife.data});
            }
        }else{
            this.setState({isLoading:false});
        }
          // await store.save("policy",response2);
                        // get("me/policy",{})
       
    };
    openDetail(id){
        this.props.navigator.push({
            screen: "mti.PrivilegeDetailScreen", // unique ID registered with Navigation.registerScreen
            passProps:{id:id},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }
    
    renderHotDealList(){
        if(this.state.hotDeal && this.state.hotDeal.length >0){    
            return this.state.hotDeal.map((hotdeal,i)=>
                <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.picture_url ? {uri:hotdeal.picture_url}:null}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.name}
                    groupId={hotdeal.group_id}
                    style={{marginLeft: responsiveWidth(3)}}
                    onPress={()=>this.openDetail(hotdeal.id)}
                />
            )
        }else{
            return this.state.hotDealDefault.map((hotdeal,i)=>
                <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.bannerUri}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.activityTitleText}
                    style={{marginLeft: responsiveWidth(3)}}
                    groupId={hotdeal.group_id}
                />
            )
        }
    }

    renderMyLifeStyleList(){
        if(this.state.myLifeStyle && this.state.myLifeStyle.length >0){    
            return this.state.hotDeal.map((myLifeStyle,i)=>
                <DashboardActivityCard 
                key={i} 
                bannerUri={myLifeStyle.picture_url ? {uri:myLifeStyle.picture_url}:null}
                iconUri={myLifeStyle.iconUri}
                iconTitleText={myLifeStyle.iconTitleText}
                activityTitleText={myLifeStyle.name}
                style={{marginLeft: responsiveWidth(3)}}
                groupId={myLifeStyle.group_id}
                onPress={()=>this.openDetail(myLifeStyle.id)}
            />
            )
        }else{
            return this.state.hotDealDefault.map((hotdeal,i)=>
                    <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.bannerUri}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.activityTitleText}
                    style={{marginLeft: responsiveWidth(3)}}
                    groupId={hotdeal.group_id}
                />
            )
        }
    }

    renderNewEventCard(){
        return(
            <DashboardActivityCard 
                bannerUri={require('./../source/images/newEventImg.png')}
                iconText={'15'}
                iconTitleText={'มกราคม'}
                activityTitleText='Chef for a Day'
                activityDetailText='Cupcake Workshops & Master classes'
                style={styles.newEventImageStyle}
            />
        )
    }

    renderPastEventCard(){
        return this.state.pastEvent.map((pastEvent,i)=>
            <PastEventCard
                key={i}
                bannerUri={pastEvent.bannerUri}
                eventTitleText={pastEvent.eventTitleText}
                eventDetailText={pastEvent.eventDetailText}
                style={{marginLeft: responsiveWidth(3)}}
            />
        )
    }
    goToPrivilleges(){
        this.props.navigator.push({
            screen: "mti.PrivilegeScreen", // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.dashboardScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='หน้าหลัก'
                    rightIconName='iconBell'
                    notify='2'
                />
                <ScrollView style={{flex: 1}}>
                    {!this.state.isLoading && <UserShortDetailCard navigator={this.props.navigator}/>}
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>HOT DEAL</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={this.goToPrivilleges}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderHotDealList()}
                        </ScrollView>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>MY LIFESTYLE</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={this.goToPrivilleges}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderMyLifeStyleList()}
                        </ScrollView>
                    </View>
                    <Image
                        source={require('./../source/images/promotionImg.png')}
                        style={styles.promotionImageStyle}
                        resizeMode='stretch'
                    />
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่มาใหม่</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            {this.renderNewEventCard()}
                        </View>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderPastEventCard()}
                        </ScrollView>
                    </View>
                </ScrollView>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    dashboardScreenContainerStyle:{
        flex: 1,

    },
    hotDealTitleTextContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
    },
    dashboardDetailTopContainerStyle:{
        flex: 1,
      
    },
    dashboardSectionTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        marginLeft: responsiveWidth(3),
    },
    newEventImageStyle:{
        width: responsiveWidth(90),

    },
    showAllContainerStyle:{
        marginRight: responsiveWidth(3),

    },
    showAllTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    scrollViewActivityCardContainerStyle:{
        flex:1
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    }
}

