import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiLocationPlus, BiFirstPage, BiGlobe, BiTimer} from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.png"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            <BiLocationPlus /> : Công Nghệ Cao Khu, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh.
          </p>
          <p className="mt-3">
            <BiMailSend /> : Ipetcute@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0987654321
          </p>
          <p className="mt-3">
            <BiFirstPage /> : https://www.facebook.com/ipetweb 
          </p>
          <p className="mt-3">
            <BiGlobe /> : https://busy-ruby-viper-suit.cyclic.app/
          </p>
          <p className="mt-3">
            <BiTimer /> : 8:00 - 20:00. Từ thứ 2 - Chủ Nhật
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact