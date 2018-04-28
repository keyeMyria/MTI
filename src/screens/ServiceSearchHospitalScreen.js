import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {ServiceListCard} from '../components/ServiceListCard';
import {getBasic} from '../api'

export default class ServiceSearchHospitalScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            serviceList:[],
            orgServiceList:[],
            isLoading: false,
            searchValue: '',
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
    }

    async componentDidMount(){
        if(!this.props.isMap){
            this.setState({isLoading: true});
            let serviceList = await getBasic('services?filter_type_id=1&page=1&pagesize=20',{});
            if(serviceList){
                this.setState({
                    serviceList:serviceList.data,
                    orgServiceList:serviceList.data,
                    isLoading: false});
            }
            // console.log(serviceList.data)
        }else{
            animationTimeout = setTimeout(() => {
                this.focus();
            },1000);
        }
    }

    focus=()=> {    
        let hospitalId = this.props.data.map(data=>data.id);
        this.mapRef.fitToSuppliedMarkers(hospitalId,true);
    }

    renderContent(){
        if(this.props.isMap){
            return(
                <MapView
                    ref={(ref) => { this.mapRef = ref; }}
                    minZoomLevel={5}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: 15.870032,
                        longitude: 100.99254100000007,
                        latitudeDelta: 15.870032,
                        longitudeDelta: 100.99254100000007,
                    }}
                    style={{flex: 1,}}
                >
                    {this.props.data.map((data)=>
                        <Marker
                            identifier={data.id}
                            key={data.id}
                            coordinate={{
                                latitude: 13.697567,
                                longitude: 100.53758300000004
                            }}
                            image={require('../source/icons/iconMapMarker.png')}
                        />
                    )}
                </MapView>
            )
        }else{
            return(
                <ServiceListCard
                    data={this.state.serviceList}
                    navigator={this.props.navigator}
                />
            )
        }
    }

    async _onSearchIconPress(){
        if(!this.props.isMap){
            this.setState({isLoading:true});
            let search = await getBasic(`services?filter_type_id=1&search=${this.state.searchValue}&page=1&pagesize=20`,{});
            if(search.data.length>0){
                this.setState({
                    serviceList: search.data,
                    isLoading: false,
                })
            }else{
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    'ไม่พบข้อมูลที่ค้นหา',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,
                        searchValue: '',
                        serviceList: this.state.orgServiceList,
                    })}},
                    ]
                )
            }
        }else{

        }

    }

    render(){
        return(
            <View style={styles.serviceSearchHospitalScreenContainerStyle}>
                <Headers
                    leftIconName={this.props.isMap?'close':'back'}
                    headerTitleText='ค้นหาโรงพยาบาลเครือข่าย MTI'
                    rightIconName='iconBell'
                    withSearch
                    longTitle
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    onPress={()=>alert('search')}
                    placeholder='ค้นหาโรงพบาบาลในพื้นที่ที่คุณต้องการ'
                />
                <View style={styles.serviceSearchHospitalContainerStyle}>
                    {this.renderContent()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    serviceSearchHospitalScreenContainerStyle:{
        flex: 1,
    },
    serviceSearchHospitalContainerStyle:{
        flex: 1,
    },
}