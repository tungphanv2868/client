import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Shop Pet"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Đối với chúng tôi, việc IPET được thành lập là muốn được lan toả
            tình yêu thương đến với Thú Cưng của mọi người với nhau, chó mèo
            không chỉ là vật nuôi mà còn là người bạn đồng hành trong cuộc sống,
            vậy nên những nhu cầu “ăn mặc" (ăn: ăn chơi, ăn uống ; mặc: mặc đồ,
            đồ chơi,...) của các boss cũng nên được đánh giá cao hơn. Các Pet
            của các bạn cũng chính là các đại Boss của chúng tôi, trong tương
            lai chúng tôi sẽ phấn đấu cũng như phát triển thêm các dịch vụ khác
            để phục vụ tốt nhất cho cộng đồng yêu thương thú cưng như chúng ta,
            nhé! Trong quá trình hoạt động, IPET luôn làm đúng những gì đã cam
            kết, tư vấn đầy đủ những thắc mắc cũng như đảm bảo quyền lợi cho sản
            phẩm, khách hàng và boss. Chất lượng và Uy tín của IPET chính là
            niềm tự hào và cũng là kim chỉ nam của chúng tôi. IPET sẽ là nơi cho
            những khách hàng tìm đến khi có nhu cầu đặc biệt dành cho người bạn
            bốn chân.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
