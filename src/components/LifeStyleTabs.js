import React,{Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import {Tab,Tabs,TabHeading,ScrollableTab} from 'native-base';
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';

class LifeStyleTabs extends Component{

    constructor(props){
        super(props)
        this.state={
            tabIndex: 0,
            previousTabIndex: 0,
        }
    }

    renderTab(){
        let tab=[
            {
                activeIcon: require('../source/icons/iconTabsActiveAll.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveAll.png'),
                title: 'All',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveHot.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveHot.png'),
                title: 'Hot',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveHealth.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveHealth.png'),
                title: 'Health and Beauty',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveEat.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveEat.png'),
                title: 'Eat and About',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveLeisure.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveLeisure.png'),
                title: 'Leisure and Travel',
            },
        ]

        tab[this.state.tabIndex].isActive = true
        if(this.state.tabIndex!=this.state.previousTabIndex){
            tab[this.state.previousTabIndex].isActive = false
        }

        return tab.map((tab)=>
            <Tab 
                key={tab.title} 
                heading={
                    <TabHeading 
                        style={styles.tabHeadingStyle}
                    >
                        <Image
                            source={tab.isActive?tab.activeIcon:tab.inActiveIcon}
                            resizeMode='contain'
                            style={[styles.tabIconStyle,tab.isActive?{}:styles.inActiveIconStyle]}
                        />
                        <Text style={[styles.tabTitleTextStyle,tab.isActive?styles.tabTitleActiveTextStyle:{}]}>{tab.title}</Text>
                    </TabHeading>
                }
            >
                <View style={styles.tabContentStyle}>
                    {this.props.tabChildren}
                </View>
            </Tab>
        )
    }

    _onChangeTab(index){
        if(index.i!=this.state.previousTabIndex){
            this.setState({
                previousTabIndex: index.i,
            })
        }
        this.setState({
            tabIndex: index.i,
        })
    }

    render(){
        return(
            <View style={styles.tabsContainerStyle}>
                <Tabs 
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle} 
                    style={[styles.tabsStyle,this.props.style]}
                    initialPage={0} 
                    onChangeTab={(index)=>this._onChangeTab(index)}
                    renderTabBar={()=> <ScrollableTab/>}

                >
                    {this.renderTab()}
                </Tabs>
            </View>
        )
    }
}

const styles={
    tabsContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    tabBarUnderlineStyle:{
        backgroundColor: '#1595d3',
        height: responsiveHeight(0.26),
    },
    tabsStyle:{
        marginTop: responsiveHeight(4),
    },
    tabHeadingStyle:{
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    tabIconStyle:{
        height: responsiveHeight(3.52),
    },
    inActiveIconStyle:{
        opacity: 0.3,
    },
    tabTitleTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: '#919195',
        letterSpacing: 0,
    },
    tabTitleActiveTextStyle:{
        color: '#1595d3',
    },
    tabContentStyle:{
        flex: 1,
        alignItems: 'center',
    }
}

export {LifeStyleTabs}