import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {LifeStyleTabs} from '../components/LifeStyleTabs';
import {DashboardActivityCard} from '../components/DashboardActivityCard';
import {post,authen,get} from '../api';

export default class PrivilegeScreen extends Component{

    constructor(props){
        super(props)
        this.state={privilege:[]}
        this.openDetail = this.openDetail.bind(this);
    }
    async componentDidMount(){
        let privilege = await get("privileges?page=1,pagesize=10",{});
        if(privilege){
            console.log(privilege.data);
            this.setState({privilege:privilege.data});
        }       
    }
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
    renderPrivilegeList(){
       

        return this.state.privilege.map((privilege,i)=>
            <DashboardActivityCard 
                key={i}
                onPress={()=>this.openDetail(privilege.id)}
                bannerUri={privilege.picture_url ? {uri:privilege.picture_url}:null}
                groupId={privilege.group_id}
                iconUri={privilege.lifeStyleIconUri}
                iconTitleText={privilege.lifeStyleTitleText}
                activityTitleText={privilege.name}
                style={[styles.dashboardActivityCardContainerStyle,i==0?{marginTop: responsiveHeight(3)}:{}]}
                iconContainerStyle={i==0?{flex: 0.35}:{}}
                detailContainerStyle={i==0?{flex: 0.65}:{}}
            />
        )
    }

    render(){
        return(
            <View style={styles.privilegeScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='สิทธิพิเศษ'
                    rightIconName='iconBell'
                    withSearch
                />
                <MainSearchBox
                    onPress={()=>alert('search')}
                />
                <ScrollView style={{zIndex:3}}>
                    <LifeStyleTabs
                        tabChildren={this.renderPrivilegeList()}
                    />
                    <View style={styles.privilegeListContainerStyle}>
                        <Image
                            source={require('./../source/images/promotionImg.png')}
                            style={styles.promotionImageStyle}
                            resizeMode='stretch'
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    privilegeScreenContainerStyle:{
        flex: 1,
    },
    privilegeListContainerStyle:{
  
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    },
    dashboardActivityCardContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}