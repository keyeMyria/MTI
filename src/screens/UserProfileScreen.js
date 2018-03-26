import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {LifeStyleBox} from './../components/LifeStyleBox';

export default class UserProfileScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            userFirstName: '',
            userLastName: '',
            userGender: '',
            userBirthDate: '',
            userEmail: '',
            userPhone: '',
            userCareer: '',
            userEducation: '',
            userIncome: '',
            userLifeStyle: '',
            userPassword: '',
            rightIconName: '',
            submitButtonText: 'แก้ไขข้อมูล',
            lifeStyleImage1:[
                {
                    uri: require('./../source/icons/iconBeauty.png'),
                    title: 'Beauty',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconDining.png'),
                    title: 'Dining',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconTravel.png'),
                    title: 'Travel',
                    isSelected: false,
                }
            ],
            lifeStyleImage1Selected:[
                {
                    uri: require('./../source/icons/iconBeautySelected.png'),
                    title: 'Beauty',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconDiningSelected.png'),
                    title: 'Dining',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconTravelSelected.png'),
                    title: 'Travel',
                    isSelected: true,
                }
            ],
            lifeStyleImage2:[
                {
                    uri: require('./../source/icons/iconHealthy.png'),
                    title: 'Healthy',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconAuto.png'),
                    title: 'Auto',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconShopping.png'),
                    title: 'Shopping',
                    isSelected: false,
                }
            ],
            lifeStyleImage2Selected:[
                {
                    uri: require('./../source/icons/iconHealthySelected.png'),
                    title: 'Healthy',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconAutoSelected.png'),
                    title: 'Auto',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconShoppingSelected.png'),
                    title: 'Shopping',
                    isSelected: true,
                }
            ],
            filterLifeStyleImage1: [],
            filterLifeStyleImage2: [],

            canEditProfile: false,
            isLifestyleModalVisible: false,
            isDateTimePickerVisible: false,

        }
    }

    componentDidMount(){
        this.setState({
            filterLifeStyleImage1: this.state.lifeStyleImage1,
            filterLifeStyleImage2: this.state.lifeStyleImage2
        })
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
  
    _handleDatePicked = (date) => {
        let dates = new Date(date).toLocaleDateString()
        this.setState({
            userBirthDate: dates
        })
        this._hideDateTimePicker()
    }

    
    onSubmitButtonPress(){
        if(this.state.submitButtonText==='แก้ไขข้อมูล'){
            this.setState({
                submitButtonText: 'บันทึกข้อมูล',
                canEditProfile: true,
            
            })
        }else{
            this.setState({
                submitButtonText: 'แก้ไขข้อมูล',
                canEditProfile: false,
            })
        }
    }

    renderCancelButton(){
        if(this.state.submitButtonText==='แก้ไขข้อมูล'){
            return(
                <View/>
            )
        }else{
            return(
                <TouchableOpacity onPress={this.onCancelButtonPress.bind(this)}>
                    <Text style={styles.cancelTextStyle}>ยกเลิก</Text>
                </TouchableOpacity>
            )
        } 
    }

    onCancelButtonPress(){
        this.setState({
            submitButtonText: 'แก้ไขข้อมูล',
            canEditProfile: false,
        })
    }

    renderLifestyleModal(){
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
          })

        return(
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                //dialogAnimation={slideAnimation}
                width={responsiveWidth(90.15)}
                height={responsiveHeight(58.05)}
                dialogStyle={styles.popupContainerStyle}
            >
                <View>
                    <TouchableOpacity onPress={()=> this.popupDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
           
                    <View style={styles.lifestyleBoxList1ContainerStyle}>
                        {this.renderLifeStyleBoxList1()}
                    </View>
                    <View style={styles.lifestyleBoxList2ContainerStyle}>
                        {this.renderLifeStyleBoxList2()}
                    </View>

                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={this.onLifestyleModalSubmitButtonPress.bind(this)}
                        />
                    </View>
                </View>
            </PopupDialog>
        )
    }

    onLifestyleModalSubmitButtonPress(){
        this.popupDialog.dismiss()

    }

    onLifeStylePress(index,list){
        if(list==='1'){
            const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
            const lifeStyleImage1Selected = [...this.state.lifeStyleImage1Selected]
            
            lifeStyleImage1[index] = {...lifeStyleImage1Selected[index]}
      
            this.setState({
                filterLifeStyleImage1: lifeStyleImage1
            })
        }else{
            const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
            const lifeStyleImage2Selected = [...this.state.lifeStyleImage2Selected]
            
            lifeStyleImage2[index] = {...lifeStyleImage2Selected[index]}
      
            this.setState({
                filterLifeStyleImage2: lifeStyleImage2
            })
        }
    }

    _onCloseButtonPress(index,list){
        if(list==='1'){
            const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
            const tempLifeStyleImage1 = [...this.state.lifeStyleImage1]
            
            lifeStyleImage1[index] = {...tempLifeStyleImage1[index]}
            
            this.setState({
                filterLifeStyleImage1: lifeStyleImage1
            })
        }else{
            const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
            const tempLifeStyleImage2 = [...this.state.lifeStyleImage2]
            
            lifeStyleImage2[index] = {...tempLifeStyleImage2[index]}
            
            this.setState({
                filterLifeStyleImage2: lifeStyleImage2
            })
        }
      
    }

    renderLifeStyleBoxList1(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage1]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.uri}
                boxTitle={lifeStyleImage.title}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'1')}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'1')}
                style={styles.boxListStyle}
            />
        )
    }

    renderLifeStyleBoxList2(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage2]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.uri}
                boxTitle={lifeStyleImage.title}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'2')}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'2')}
                style={styles.boxListStyle}
            />
        )
    }


    render(){
        return(
            <View style={styles.userProfileScreenContainerStyle}>
                <ScrollView style={{flex: 1}}>
                    <Headers
                        leftIconName='back'
                        headerTitleText='ข้อมูลส่วนตัว'
                        rightIconName='iconBell'
                        //notify='2'
                    />
                    <View style={styles.userShortDetailContainerStyle}>
                        <View style={styles.userAvatarContainerStyle}>
                            <TouchableOpacity style={styles.userAvatarSectionStyle}>
                                <View style={styles.avatarBorderStyle}/>
                                <ImageBackground
                                    source={require('./../source/images/userAvatarImg.png')}
                                    style={styles.userAvatarImageStyle}
                                    borderRadius= {responsiveHeight(5.235)}
                                >
                                    <View style={styles.activityCardOverlayImageStyle}>
                                        <Image
                                            source={require('./../source/icons/iconCamera.png')}
                                            resizeMode='contain'
                                            style={styles.cameraIconStyle}
                                        />
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={styles.userNameTextStyle}>ชรินทร์ทิพย์  บำรุงศักดิ์</Text>
                            <Text style={styles.userLevelTextStyle}>สมาชิกระดับ Silver</Text>
                        </View>
                    </View>
                    <View style={styles.userDetailContainerStyle}>
                        <TextInputIcon
                            value={this.state.userFirstName}
                            onChangeText={(userFirstName)=>this.setState({userFirstName})}
                            leftLabelText='ชื่อ'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        /> 
                        <TextInputIcon
                            value={this.state.userLastName}
                            onChangeText={(userLastName)=>this.setState({userLastName})}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        />
                        <TextInputIcon
                            genderValue={this.state.userGender}
                            onSubmitEditing={(userGender)=>this.setState({userGender})}
                            leftLabelText='เพศ'
                            iconUri={require('./../source/icons/iconGender.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            inputType='selector'
                            editable={this.state.canEditProfile}
                        />
                        <TouchableOpacity disabled={!this.state.canEditProfile} onPress={this._showDateTimePicker}>
                            <View pointerEvents={this.state.isDateTimePickerVisible ? 'auto' : 'none'}>
                                <TextInputIcon
                                    value={this.state.userBirthDate}
                                    leftLabelText='วันเกิด'
                                    iconUri={require('./../source/icons/iconBD.png')}
                                    containerStyle={styles.inputContainerStyle}
                                    editable={false}
                                    secondFlex={secondFlex}
                                    thirdFlex={thirdFlex}
                                />
                            </View>
                        </TouchableOpacity>
                        <TextInputIcon
                            value={this.state.userEmail}
                            onChangeText={(userEmail)=>this.setState({userEmail})}
                            leftLabelText='อีเมล'
                            iconUri={require('./../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        />
                        <TextInputIcon
                            value={this.state.userPhone}
                            onChangeText={(userPhone)=>this.setState({userPhone})}
                            leftLabelText='โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            editable={this.state.canEditProfile}
                        />
                        <TextInputIcon
                            value={this.state.userCareer}
                            onChangeText={(userCareer)=>this.setState({userCareer})}
                            leftLabelText='อาชีพ'
                            iconUri={require('./../source/icons/iconCareer.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                        />
                        <TextInputIcon
                            value={this.state.userEducation}
                            onChangeText={(userEducation)=>this.setState({userEducation})}
                            leftLabelText='การศึกษา'
                            iconUri={require('./../source/icons/iconEducation.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        />
                        <TextInputIcon
                            value={this.state.userIncome}
                            onChangeText={(userIncome)=>this.setState({userIncome})}
                            leftLabelText='รายได้'
                            iconUri={require('./../source/icons/iconIncome.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        />
                        <TouchableOpacity disabled={!this.state.canEditProfile} onPress={()=>this.popupDialog.show()}>
                            <View pointerEvents={this.state.isLifestyleModalVisible ? 'auto' : 'none'}>
                                <TextInputIcon
                                    value={this.state.userLifeStyle}
                                    leftLabelText='ไลฟ์สไตล์'
                                    iconUri={require('./../source/icons/iconLifestyle.png')}
                                    containerStyle={styles.inputContainerStyle}
                                    secondFlex={secondFlex}
                                    thirdFlex={thirdFlex}
                                    editable={false}
                                    rightIconName='pen'
                                />
                            </View>
                        </TouchableOpacity>
                        <TextInputIcon
                            value={this.state.userPassword}
                            leftLabelText='รหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={styles.inputContainerStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userPassword)=> this.setState({userPassword})}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                        />
                        <View style={styles.submitButtonContainerStyle}>
                            <MainSubmitButton
                                buttonTitleText={this.state.submitButtonText}
                                onPress={this.onSubmitButtonPress.bind(this)}
                            />
                        </View>
                        {this.renderCancelButton()}
                        <DateTimePicker
                            titleIOS='วันเกิด'
                            titleStyle={styles.dateTitleTextStyle}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                
                </ScrollView>
                {this.renderLifestyleModal()}
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.6

const styles={
    userProfileScreenContainerStyle:{
        flex: 1,

    },
    userShortDetailContainerStyle:{
        height: responsiveHeight(26.05),
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatarContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatarSectionStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarBorderStyle:{
        height: responsiveHeight(11.26),
        width: responsiveHeight(11.26),
        borderWidth: responsiveFontSize(0.4),
        borderRadius: responsiveHeight(5.63),
        borderColor: "#d8d8d9",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
   
    },
    userAvatarImageStyle:{
        height: responsiveHeight(10.47),
        width: responsiveHeight(10.47),
        position: 'absolute',
        zIndex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: responsiveHeight(8),

    },  
    activityCardOverlayImageStyle:{
        height: responsiveHeight(3),
        width: '50%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3,
        borderRadius: responsiveHeight(1),

    },
    cameraIconStyle:{
        height: responsiveHeight(2),
    },
    userNameTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(1),

    },
    userLevelTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    userDetailContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(7.8)
    },
    iconStyle:{
        height: responsiveHeight(3)
    },
    submitButtonContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3)
    },
    cancelTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3',
        textDecorationLine: 'underline',
        textDecorationColor: '#0194d2',
        textDecorationStyle: 'solid',
        textAlign: 'right',
        marginBottom: responsiveHeight(3)
    },
    dateTitleTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3'
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    lifestyleBoxList1ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: responsiveHeight(2),
        marginTop: responsiveHeight(3),
    },
    lifestyleBoxList2ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxListStyle:{
        width: responsiveHeight(12),
        height: responsiveHeight(12),
    }
}