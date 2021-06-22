import React, { useEffect, useState } from 'react';
import anhBia from './../../assets/image/socialMeadia/anhBia.png'
import avt from './../../assets/image/avt.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { getInforAccountById, getSocialMediaByIdCard } from '../../Actions/Account.action'
import { useParams } from "react-router-dom";
import { message, Spin } from 'antd';
import { Image } from 'cloudinary-react';

const Profile = (props) => {
    // fetch du lieu tren store
    const Account = useSelector(state => state.Account)
    const { userNFC, socialMedia } = Account
    const [SocialMedia, setSocialMedia] = useState({});
    const [userInforM, setuserInforM] = useState({});

    //  lay du lieu tren API sau do lua vao store 
    let { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        if (JSON.stringify(id) !== '{}') {
            dispatch(getInforAccountById(id))
            dispatch(getSocialMediaByIdCard(id))
        } else {
            alert("loi! vui long thu lai ")
        }
    }, []);
    useEffect(() => {
        if (userNFC) {
            setuserInforM(userNFC[0])
        }
        if (socialMedia) {
            setSocialMedia(socialMedia[0])
        }

    });
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        message.success('Copy thành công!');
    }
    return (
        userInforM.isActive === 1 ?
            <div>
                <div className="imageRetargular">
                    <img src={anhBia} className="anhBia" />
                    <h2 className="logo"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1000"
                    >TapDee</h2>
                    <Image
                        className="avtImg"
                        cloudName="Tapdee"
                        publicId={userInforM.avt === '' ? 'avatar/f2sytixvkygof5kleenu' : userInforM.avt}
                        width="300"
                        crop="scale"
                        ata-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos="zoom-in"
                        data-aos-duration="400"
                    />
                </div>
                <p
                    className="text-center mt-90 desAccount mb-3"
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                >{userInforM.moTa}</p>

                <h2
                    className="text-center nameAccount mt-2"
                    data-aos="zoom-in"
                    data-aos-duration="1000"

                >{userInforM.hoTen}</h2>
                <div className="socialMedia mt-4">
                    {Object.keys(SocialMedia)
                        .map(igKey => {
                            return [...Array(SocialMedia[igKey])].map((social, index) => {
                                return (
                                    <div
                                        data-aos="zoom-in"
                                        data-aos-duration="1000"
                                        key={social}
                                        className={social !== "" ? `iconSocialMedia mt-2 ${igKey}` : "d-none"}
                                    >
                                        {
                                            igKey === "Zalo" ? <a href={`https://www.zalo.me/${social}`} /> :
                                                igKey === "Instagram" ? <a href={`https://www.instagram.com/${social}`} /> :
                                                    igKey === "Phone" ? <a href={`tel:${social}`} /> :
                                                        igKey === "Gmail" ? <a href={`mailto:${social}`} /> :
                                                            igKey === "Telegram" ? <a href={`https://t.me/${social}`} /> :
                                                                igKey === "Shopee" ? <a href={`https://shopee.vn/:${social}`} /> :
                                                                    igKey === "MOMO" ? <a href={`https://nhantien.momo.vn/${social}`} /> :
                                                                        igKey === "Techcombank" || igKey === "Agribank" || igKey === "BIDV" || igKey === "MSB"
                                                                            || igKey === "PVcomBank" || igKey === "TPBank" || igKey === "VCB"
                                                                            || igKey === "VIB" || igKey === "VietinBank" || igKey === "VPBank" ?
                                                                            <a onClick={() => copyToClipboard(social)}><input type="text" value={social} id="myInput" style={{ display: "none" }} /></a>
                                                                            : <a href={social} />
                                        }
                                    </div>
                                )
                            });
                        })
                    }
                </div>
                <div className="bottom_div"></div>
            </div >
            : userInforM.isActive === 0 ? <h1 className="UIlock"> Tài khoản của bạn bị khóa, vui lòng mở khóa để sử dụng dịch vụ</h1> :
                <Spin tip="Loading...">
                    <div className="spinner mb-5">
                        <h2>TapDee</h2>
                        <p>Smart Card -  Smart Life</p>
                    </div>
                </Spin>
    );
}

export default Profile;
